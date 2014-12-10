$(document).ready(function() {

	var $table 			= $(".v65-productDisplay .v65-productDisplay"),
	    $cells 			= $table.find("td[valign=top]"),
	    $card,
	    price_regex = /\$[0-9]+\.[0-9]+/;

	var json_cards = $cells.find("img").map(function() {
		var $this = $(this);
		return {
			img: {
				src: $this.attr("src"),
				alt: $this.attr("alt")
			}
		};
	});

	var $permalinks = $cells.find("a:not(:has(img))");
	$permalinks.each(function(index) {
		// console(index);
		$this = $(this);

		$product_price = $this.parent().find(".product_productprice");
		$sale_price = $this.parent().find(".product_saleprice");

		json_cards[index].permalink = {
			text  : $this.text(),
			title : $this.attr("title"),
			href  : $this.attr("href")
		};

		json_cards[index].product_price = $product_price.text().match(price_regex)[0];

		if ( $sale_price.get(0) ) {
			json_cards[index].sale_price = $sale_price.text().match(price_regex)[0];
		};

	});	

	// console.log(json_cards);
	
	$(json_cards).each(function(index) {
		$card = $("<div/>", {
			class: 'card'
		}).appendTo("#injected_content");		

		$("<img/>", {
			src: json_cards[index].img.src,
			alt: json_cards[index].img.alt
		}).appendTo($card);

		$("<a/>", {
			text: json_cards[index].permalink.text,
			href: json_cards[index].permalink.href
		}).appendTo($card);

		$("<p/>", {
			text: json_cards[index].product_price
		}).appendTo($card);

		$("<p/>", {
			text: json_cards[index].sale_price
		}).appendTo($card);

	});
	

});
