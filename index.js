angular.module("index",["ngRoute"])
	.config(function($routeProvider) {
		$routeProvider.when("/home",{
			templateUrl:"templates/home.html"
		});
		$routeProvider.when("/about",{
			templateUrl:"templates/about.html"
		});
		$routeProvider.when("/portfolio",{
			templateUrl:"templates/portfolio.html"
		});
		$routeProvider.when("/codesamples",{
			templateUrl:"templates/codesamples.html"
		});
		$routeProvider.when("/accolades",{
			templateUrl:"templates/accolades.html"
		});
		$routeProvider.otherwise({
			redirectTo:"/home"
		});
		
	})
	.controller("main", function($scope) {
		
		$scope.accordion = function(event) {
			var $ele = $(event.target);
			if($("[data-accordion='content']",$ele).hasClass("opened")) { 
				//for now do nothing in this event, a slide will always be open. Uncomment below to close a slide that is open when clicked. 
				//$("[data-accordion='content']",$ele).removeClass("opened").slideUp(); console.log("Just in the if...");
			}
			else{
		console.log("Did we make it in here?");
				$("[data-accordion='content']",$ele.parent()).each(function() {
					if($(this).hasClass("opened")) { $(this).removeClass("opened").slideUp(); }
				});
				$("[data-accordion='content']",$ele).slideDown().addClass("opened");
				setTimeout(function(){$('html, body').animate({ scrollTop: $ele.offset().top}, 200);},450);
			}
		}
		
		$scope.screenTransition = function(event) { //TODO : MOVE THIS INTO A DIRECTIVE AT SOME POINT!
			var $ele = $(event.target);
			var container = $ele.attr("data-container"); //property name to identify container element
			var $container = $ele.closest("[data-transition='"+container+"']"); //element containing all structures of this type
			var $parent = $ele.closest("[data-transition='parent']"); //top of this element's structure
			var transCont = $ele.attr("data-container-trans"); //class added to containing element to hide elements during transition 
			var transClass = $ele.attr("data-trans"); //class used to transition the element to be viewed
			var activated = $ele.attr("data-marker"); //class used to indicate transition state of container
			var thisWindow = $(window).width(); //used to determine whether we are on mobile or not
			console.log(container +" "+transCont+" "+transClass+" "+activated+" "+thisWindow);
			if (thisWindow < 768) { //we are on mobile, less magic
				$('html, body').animate({ scrollTop: $parent.offset().top}, 1000); //move this element to the top of the screen
				$parent.hasClass(transClass) ? $parent.removeClass(transClass) : $parent.addClass(transClass); //add/remove the magic
			}
			else { //we are on tablet or desktop, more magic (in the form of a time out that will add classes to hide other items and expand the active one)
				$container.addClass(transCont);
				//timeout here must match the transition time use for the active class
				setTimeout(function() {
					if(!$container.hasClass(activated)) {
						$container.addClass(activated);
						$parent.addClass(transClass);
					}
					else {
						$container.removeClass(activated);
						$parent.removeClass(transClass);
					}
					$container.removeClass(transCont);
				},1000);
			}
		};
		
		$scope.samples = [
			{
				"id":"Campus Colors",
				"tresponsive":true,
				"mresponsive":true,
				"href":"http://www.campuscolors.com",
				"deskimg":"cc-home-desk-full.jpg",
				"tabletimg":"cc-home-tab-full.jpg",
				"mobileimg":"cc-mobile-home-full.jpg",
				"github":"https://www.github.com/campuscolors/campuscolors",
				"client":"Campus Colors",
				"businesstype":"Sporting Apparel",
				"skills":"Elastic Search, Responsive HTML/CSS, JQuerry, JSON, Carousels",
				"description1":"A responsive implimentation was used to enable this application to change views based on the screen size of the " 
					+	"device it was displayed on. CSS media queries for screen sizes at 320px (mobile phone), 768px (tablet), 960px (small desktop), "
					+	"and 1080 (large desktop) allowed break points which allowed for the application to conform to the different screen sizes.",
				"description2":"This application also used an Elastic Search based solution in place of a category structure. Searchable attributes "
					+	"were added to products to indicate possible associations that they possesed. Using customizable JSON filters in place of " 
					+	"categories allowed for new pages to be created quickly and simply without the need to populate a category. All that was "
					+	"needed was to indicate which product attributes should be included in the search result, along with a bit of data such as "
					+	"meta description/title, and a page heading and/or banner image."
			},
			{
				"id":"Beachmall",
				"tresponsive":false,
				"mresponsive":false,
				"href":"http://www.beachmall.com",
				"deskimg":"beach-home-desk-full.jpg",
				"github":"https://www.github.com/beachmall/beachmall.com/",
				"client":"Beachmall",
				"businesstype":"Beach Equipment and Apparel",
				"skills":"HTML, CSS, JQuerry, Carousels",
				"description1":"Beachmall used several customizations to set it apart from other applications. These included a three tier "
					+	"drop-down navigation menu in the header, geo-location to determine users location and estimate shipping automatically, "
					+	"a related items image display within product lists complete with image zoom, and several (usually several on a page) carousels.",
				"description2":"The multi-level drop-down was achieved by changing the height and width of the containing elements with JQuery."
					+	"Geo-location was acheived through a simple Commerce Rack API call, however if the call failed checks had to be made once the "
					+	"product page or cart was reached to ensure the API was checked again for the information, or the user was informed a shipping "
					+	"estimate was not available. In addition to the location information, several attributes had to be checked to account for back-orders, "
					+	"discontinued items, drop or delayed shipping, and items with expedited shipping available. Product lists and space were maximized"
					+	"in this application by using both horizontal and vertical carousels to show multiple product lists on the home and product pages."
			},
			{
				"id":"Bikinimo",
				"tresponsive":false,
				"mresponsive":false,
				"href":"http://app.bikinimo.com",
				"deskimg":"bikinimo-home-desk-full.jpg",
				"github":"https://www.github.com/bikinimo/bikinimo/",
				"client":"Bikinimo",
				"businesstype":"Swimsuit Apparel",
				"skills":"Modal Product Page, Elastic Search, HTML/CSS, JQuerry, JSON, Carousels",
				"description1":"The concept with Bikinimo was to move the user around as little as possible. Several continuously scrolling carousels "
					+	"with special product lists were available for browsing on the homepage and a shallow category structure allowed the user to travel "
					+	"only a couple of pages and have a complete selection available. A product page that opened in a JQuery dialogue was the real "
					+	"kicker in this application. It allowed the user to view products in their entirety, and return to the position they were browsing prior to "
					+	"viewing the product. Purchases could also be made from the product dialogue, making an extra page jump unnecessary to add to cart",
				"description2":"Recently viewed and related products could be accessed from a slide out in the dialogue. When activated the dialogue was "
					+	"smoothly repositioned at center screen to account for the new wider window. You tube embedded videos are also available for products "
					+	"that used them. One last special feature for this application was that all products were separate, but matching pieces were combined "
					+	"on the front-end to allow for separate or matching set purchese from the same product page."
			},
			{
				"id":"nyc i wear",
				"tresponsive":true,
				"mresponsive":false,
				"href":"http://www.campuscolors.com",
				"deskimg":"nyci-home-desk-full.jpg",
				"tabletimg":"nyci-home-tab-full.jpg",
				"github":"https://www.github.com/nyciwear/nyciwear.com/",
				"client":"nyc i wear",
				"businesstype":"Designer Eyewear",
				"skills":"Responsive HTML/CSS, JQuerry",
				"description1":"NYC i Wear was designed with a responsive view, however the client held the project before the mobile view was complete.",
				"description2":"This was a fairly basic application, and it's design was based on the existing non-application store the client had. The header "
					+	"received a couple of upgrades in the form of a drop-down menu that showed the cart contents, search and recently veiwed items. "
					+	"Paypal credit banners were also an addition included in this application."
			},
			{
				"id":"The Sev",
				"tresponsive":true,
				"mresponsive":true,
				"href":null,
				"deskimg":"sev-home-desk-full.jpg",
				"tabletimg":"sev-home-tablet-full.jpg",
				"mobileimg":"sev-home-mobile-full.jpg",
				"github":"https://www.github.com/smbsi-thesev/thesev/",
				"client":"The Sev",
				"businesstype":"Beauty Accessories",
				"skills":"Masonry Layout, Responsive HTML/CSS, JQuerry",
				"description1":"The Sev included a responsive layout, as well as the use of a masonry category/product list layout similar to what Pintrest "
					+	"uses. ",
				"description2":"The difference with The Sev's masonry layout was that it used four different width and height formats that were randomly "
					+	"assigned to each list item. A plug-in handled the layout, but randomization of the element sizes was handled by class assignment "
					+	"at the time the template for each element was rendered."
			},
			{
				"id":"Quality Overstock",
				"tresponsive":false,
				"mresponsive":false,
				"href":"http://app.qualityoverstock.com",
				"deskimg":"qos-home-desk-full.jpg",
				"github":"https://www.github.com/qualityoverstock/qualityoverstock/",
				"client":"Quality Overstock",
				"businesstype":"Designer Collectables, and Figurines",
				"skills":"HTML5/CSS3, JQuerry, JSON, Carousel within a Carousel",
				"description1":"Quality Overstock is a simple shopping application that presents a couple of flashy features to give it some punch.",
				"description2":"The most noticeable of these features is the carousel at the bottom of the product page. It is a carousel which contains "
					+	"three other carousels. This is an efficient way to maximize space on the product page while up-selling. Another noteable feature is "
					+	"the ability to hide out of stock items in product lists. This allows the client to gather SEO on pages for out-of-stock items while offering "
					+	"the user an option to filter out items they cannot currently buy."
			}
		];
	});