$(document).ready(function() {

	var $table 			= $(".v65-productDisplay .v65-productDisplay"),
	    $cells 			= $table.find("td[valign=top]"),
	    price_regex = /\$[0-9]+\.[0-9]+/;

	// alert($cells.length);

	var $images = $cells.find("img").map(function() {
		var $this = $(this);
			return {
				src: $this.attr("src"),
				alt: $this.attr("alt")
			};
	}).get();

	var $permalinks = $cells.find("a:not(:has(img))").map(function() {
		var $this = $(this);
		return {
			href: $this.attr("href"),
			title: $this.attr("title"),
			text: $this.text()
			// text: $this.text().match(/(^\n)*$/)
		}
	}).get();
	
	var $product_price = $cells.find(".product_productprice").map(function() {
		return $(this).text().match(price_regex);
	}).get();

	var $sale_price = $cells.find(".product_saleprice").map(function() {
		return $(this).text().match(price_regex);
	});

	// console.log($images);
	// console.log($permalinks[0]).text.match(/(^\n)*$/);
	// check = $permalinks[3].text;
	// console.log(check);
	// console.log($permalinks);
	// console.log($product_price);
	// console.log($sale_price);



	var card_length = $permalinks.length;
	var cards = [];

	for (var i = 0; i < card_length; i++) {
		cards.push({
			text: $permalinks[i].text,
			href: $permalinks[i].href,
			src:  $images[i].src,
			alt:  $images[i].alt,
			product_price: $product_price[i],
			sale_price:    $sale_price[i]
		});

	}
	console.log(cards);	


	var $card;
	$(cards).each(function(index) {
		// $("#injected_content").append("<div class='card'><img src='"+cards[index].src+"' alt='"+cards[index].alt+"'/> <a href='"+cards[index].href+"'>"+cards[index].text+"</a></div>");
		$card = $("<div/>", {
			class: 'card'
		}).appendTo("#injected_content");		

		$("<img/>", {
			src: cards[index].src,
			alt: cards[index].alt
		}).appendTo($card);

		$("<a/>", {
			text: cards[index].text,
			href: cards[index].href
		}).appendTo($card);

		$("<p/>", {
			text: cards[index].product_price
		}).appendTo($card);

		$("<p/>", {
			text: cards[index].sale_price
		}).appendTo($card);

	});

});
















