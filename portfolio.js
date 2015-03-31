function screenTransition($ele) {
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

function addClass($ele) {
	console.log('this ran');
	$ele.closest(".parallax").addClass("fall");
};


//MAY BE USEFULL LATER...----------------------------------------------------------------------------------------------------------------------------------------------------
//toggles class on closest "parent" of passed element to trigger css transition dropdown
function toggleTranslate($ele) {
	var $parent = $ele.closest("[data-transition='parent']"); //top of this element's structure
	var transClass = $ele.attr("data-transition"); //the class that will expand/contract the list item being triggered
	var hideClass = $ele.attr("data-hide"); //the class that will hide/show the other list items not being triggered
	var showClass = "show" //the class that will mark the triggering item so it is isn't hidden
	var thisWindow = $(window).width(); //determine whether we are on mobile or not
	//we are on mobile, less magic
	if (thisWindow < 768) { 
		$('html, body').animate({ scrollTop: $parent.offset().top - 65 }, 1000);
		$parent.hasClass(transClass) ? $parent.removeClass(transClass) : $parent.addClass(transClass); 
	}
	//we are on tablet or desktop, more magic
	else {
		if(!$parent.hasClass(transClass)) {
			$parent.addClass(showClass);
			$("[data-transition='parent']",$parent.parent()).each(function() {
				$(this).addClass(hideClass);
			});
			setTimeout(function() { 
				$("[data-transition='parent']",$parent.parent()).each(function() {
					$(this).hasClass(showClass) ? "" : $(this).addClass("displayNone");
				});
				$parent.addClass("notInlineBlock");
				$parent.removeClass(hideClass);
				$parent.addClass(transClass);
			},2000);
		}
		else {
			$parent.addClass(hideClass);
			$parent.removeClass(transClass);
			$("[data-transition='parent']",$parent.parent()).each(function() {
				$(this).removeClass("displayNone");
			});
			setTimeout(function() {
				$("[data-transition='parent']",$parent.parent()).each(function() {
					$parent.removeClass("notInlineBlock");
					$(this).removeClass(hideClass);
				});
			},2000);
			
	//		$parent.removeClass(transClass);
	//		setTimeout(function() {
	//			$("[data-transition='parent']",$parent.parent()).each(function(){
	//					//$(this).css("display","inline-block");
	//					//$(this).animate({"min-height":"18.7em","height":"auto","padding":"1em 0","margin":"1.2em 1% 0 1%"},500);
	//					$(this).removeClass(hideClass);
	//				});
	//				$parent.removeClass(showClass);
	//		},600);
		}
	}
};

//same as toggleTranslate but works form multiple elements in a group. Removes multiple classes and adds one.
function toggleGroup($ele) {
	var $parent = $ele.closest("[data-transition='parent']");
	var transClass = $ele.attr("data-transition");
	var removeClass = $ele.attr("data-remove").split("|");
	for(index in removeClass) {
		$parent.removeClass(removeClass[index]);
	}
	setTimeout(function(){ $parent.addClass(transClass); },0);
};





function up($this) {
	$this.slideUp();
}

//TODO : KILL THIS ONCE THE REST WORK OK
function toggleAction($ele) {
	var $parent = $ele.closest("[data-active='parent']");
	var target = $ele.attr("data-activate");
	var transClass = $ele.attr("data-transclass");
	if($("[data-active='"+target+"']",$parent).hasClass(transClass))
		$("[data-active='"+target+"']",$parent).removeClass(transClass);
	else {	
		console.log(target);
		$("."+transClass,$parent).each(function() {
			$(this).removeClass(transClass);
		});
		$("[data-active='"+target+"']",$parent).addClass(transClass);
	}
};