var FotoSelect = function() {
	this.images = [];
};

FotoSelect.prototype.getImages = function(fotoselect, max_selections) {

	return $.Deferred(function() {

		var self = this;

		window.imagePicker.getPictures(function(results) {

			if (results.length == 0) {
				self.reject();
			}
			
			fotoselect.images = results;
			self.resolve();

		}, function(error) {
			fotobarUI.alertUser({type:'error', message:'Image Select Error: ' + error});
		}, {
			maximumImagesCount : max_selections,
			quality : 70
		// width: 800
		});
	});
};