var FotobarFacebook = function() {

	this.loginStatus;
	this.paginationUrl;
};

FotobarFacebook.prototype.pagination = function() {
	
	return $.Deferred(function() {

		var self = this;
		
		facebookConnectPlugin.api( fotobarUI.faceBook.paginationUrl, null, function(photos) {

			var igImages = [];
			
			if(fotobarUI.faceBook.paginationUrl == null ){
				self.resolve(igImages);
			}
			
			fotobarUI.faceBook.paginationUrl = (photos.paging.next == null )? null:photos.paging.next.replace(/^.*\/\/[^\/]+/, '');
			
			if( photos.paging.next == null ){
				$('#show_more').hide();
			}
			
			for (count in photos.data) {

				imageData = {
					id : photos.data[count].id,
					url : photos.data[count].images[0].source
				}

				igImages.push(imageData);
			}

			self.resolve(igImages);
		}, function(error) {
			//alert(error);
			self.reject(error);
		});
	});
};


FotobarFacebook.prototype.login = function() {

	var self = this;

	return $.Deferred(function() {

		if (!window.cordova) {
			var appId = prompt("Enter FB Application ID", "");
			facebookConnectPlugin.browserInit(appId);
		}
		var that = this;
		facebookConnectPlugin.login([ "user_photos" ], function(response) {

			fotobarConfig.setUserParam('facebook_userID',
					response.authResponse.userID);
			fotobarConfig.setUserParam('facebook_accessToken',
					response.authResponse.accessToken);
			fotobarUI.FbLoginStatus = 'connected';

			that.resolve();
		}, function(response) {
			that.reject(response);
		});

	});
};

FotobarFacebook.prototype.getAlbumPhotos = function(album_id) {

	return $.Deferred(function() {

		var self = this;
		facebookConnectPlugin.api("/" + album_id + "/photos?limit="+fotobarUI.photo_limit, null, function(
				photos) {
			
			fotobarUI.faceBook.paginationUrl = (photos.paging.next == null )? null:photos.paging.next.replace(/^.*\/\/[^\/]+/, '');
			if( photos.paging.next == null ){
				$('#show_more').hide();
			}
			
			var igImages = [];
			for (count in photos.data) {

				imageData = {
					id : photos.data[count].id,
					url : photos.data[count].images[0].source
				}

				igImages.push(imageData);
			}

			self.resolve(igImages);
		}, function(error) {

			self.reject(error);
		});
	});
};

FotobarFacebook.prototype.getAlbums = function(user_id) {

	return $
			.Deferred(function() {

				var self = this;
				facebookConnectPlugin
						.api(
								user_id
										+ "/?fields=albums{name, count, photos.limit(1){name, picture}}", /* ["user_photos"] */
								null, function(result) {
									fotobarUI.current_social_media = 'fb';
									self.resolve(result.albums);
								}, function(error) {

									self.reject(error);
								});
			});
};

FotobarFacebook.prototype.showDialog = function() {

	facebookConnectPlugin.showDialog({
		method : "feed"
	}, function(response) {
		alert(JSON.stringify(response))
	}, function(response) {
		alert(JSON.stringify(response))
	});
};

FotobarFacebook.prototype.getAccessToken = function() {

	facebookConnectPlugin.getAccessToken(function(response) {
		fotobarConfig.setUserParam('facebook_accessToken',
				response.authResponse.accessToken);
	}, function(response) {
		alert(JSON.stringify(response))
	});
};

FotobarFacebook.prototype.getStatus = function() {

	facebookConnectPlugin.getLoginStatus(function(response) {

		fotobarUI.FbLoginStatus = response.status;
	}, function(response) {
		fotobarUI.alertUser({type:'error', message: JSON.stringify(response)});
	});
};

FotobarFacebook.prototype.logout = function() {

	var self = this;
	facebookConnectPlugin.logout(function(response) {

		fotobarUI.FbLoginStatus = null;
		//fotobarUI.alertUser('success', 'You have logged out of Facebook.');
		fotobarConfig.setUserParam('facebook_accessToken', null);
	}, function(response) {
		alert(JSON.stringify(response))
	});
};
