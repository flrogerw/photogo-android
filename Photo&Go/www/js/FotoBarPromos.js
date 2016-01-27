var FotobarPromos = function(promos) {

	this.isPromos = false;
	this.promo_display = '';
	this.promos;
	
	if( promos.length > 0 ){
		
		this.isPromos = true;
		this.cachePromoImages(promos);
		this.createPromoDisplay(promos);
		this.promos = promos;
	}
};

FotobarPromos.prototype.processPromos = function( promo_type ) {

	if( typeof this.promos != 'undefined' ){

		for(var i=0; i < this.promos.length; i++){
			
			if( this.promos[i].promo_type != promo_type ){continue;}
			
			var logic = this.promos[i].promo_logic;
			var logic_vars = {};
			
			for( param in this.promos[i].promo_logic_vars ){
							
				logic_vars[param] = fotobarCart[fotobarPromos.promos[i].promo_logic_vars[param]];
			}
			
			var expr = Parser.parse(logic);
			result = expr.evaluate(logic_vars);
			return( result );
		}
	}else{
		return( false );
	}
	
};

FotobarPromos.prototype.cachePromoImages = function(promos) {

	for( i in promos ){
		
		var img = new Image();
	    img.onload = function() {}
	    img.src = promos[i].image_url;	
	}
};

FotobarPromos.prototype.hasPromos = function() {
	
	return this.isPromos;
};

FotobarPromos.prototype.getPromoDisplay = function() {
	
	return( this.promo_display );
};

FotobarPromos.prototype.createPromoDisplay = function(promos) {

	for( var i=0; i < promos.length; i++){

		this.promo_display += '<div><img  alt="'+promos[i].text+'" src="'+promos[i].image_url+'" /></div>';
	}
};