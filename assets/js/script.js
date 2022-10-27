// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector("nav .toggle-sidebar");
const allSideDivider = document.querySelectorAll("#sidebar .divider");

if (sidebar.classList.contains("hide")) {
	allSideDivider.forEach((item) => {
		item.textContent = "-";
	});
	allDropdown.forEach((item) => {
		const a = item.parentElement.querySelector("a:first-child");
		a.classList.remove("active");
		item.classList.remove("show");
	});
} else {
	allSideDivider.forEach((item) => {
		item.textContent = item.dataset.text;
	});
}

toggleSidebar.addEventListener("click", function () {
	sidebar.classList.toggle("hide");

	if (sidebar.classList.contains("hide")) {
		allSideDivider.forEach((item) => {
			item.textContent = "-";
		});

		allDropdown.forEach((item) => {
			const a = item.parentElement.querySelector("a:first-child");
			a.classList.remove("active");
			item.classList.remove("show");
		});
	} else {
		allSideDivider.forEach((item) => {
			item.textContent = item.dataset.text;
		});
	}
});

sidebar.addEventListener("mouseleave", function () {
	if (this.classList.contains("hide")) {
		allDropdown.forEach((item) => {
			const a = item.parentElement.querySelector("a:first-child");
			a.classList.remove("active");
			item.classList.remove("show");
		});
		allSideDivider.forEach((item) => {
			item.textContent = "-";
		});
	}
});

sidebar.addEventListener("mouseenter", function () {
	if (this.classList.contains("hide")) {
		allDropdown.forEach((item) => {
			const a = item.parentElement.querySelector("a:first-child");
			a.classList.remove("active");
			item.classList.remove("show");
		});
		allSideDivider.forEach((item) => {
			item.textContent = item.dataset.text;
		});
	}
});

// scriptsz

// BarChart Starts

var ctx = document.getElementById("myChart").getContext("2d");
const gradientcolor = ctx.createLinearGradient(0, 0, 0, 350);

gradientcolor.addColorStop(1, "#09C6F9");
gradientcolor.addColorStop(0.2, "#045DE9");
const data4 = ["8k"];
const data3 = ["6k"];
const data2 = ["4k"];
const data1 = ["2k"];
const data0 = ["0k"];

const data = {
	labels: [
		"Q1 2018",
		"Q2 2018",
		"Q3 2018",
		"Q4 2018",
		"Q1 2019",
		"Q2 2019",
		"Q3 2019",
		"Q4 2019",
		"Q1 2020",
		"Q2 2020",
		"Q3 2020",
		"Q4 2020",
	],
	datasets: [
		{
			label: "",
			data: [
				4000, 7000, 5000, 2500, 5200, 4400, 7000, 4200, 7500, 2000, 3000, 5000,
			],
			backgroundColor: gradientcolor,

			borderWidth: 1,
			borderRadius: 20,
		},
	],
};

// config
const config = {
	type: "bar",
	data,
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,

				ticks: {
					stepSize: 2000,
					callback: function (value, index, values) {
						if (index === 4) {
							return data4;
						}
						if (index === 3) {
							return data3;
						}
						if (index === 2) {
							return data2;
						}
						if (index === 1) {
							return data1;
						}
						if (index === 0) {
							return data0;
						} else {
							return value;
						}
					},
				},
			},
		},
	},
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);
// BarChart Ends

// Doughtnut Starts

//setup

const datapie = {
	labels: [
		"Crowd sale",
		"Team",
		"Advisor",
		"Project",
		"Master nodes",
		"Program",
	],
	datasets: [
		{
			label: "",
			data: [41, 18, 15, 10, 8, 8],
			backgroundColor: ["blue", "purple", "green", "orange", "pink", "skyblue"],
			borderColor: ["white"],
			borderWidth: 1,
		},
	],
};

// config
const configpie = {
	type: "doughnut",
	data: datapie,
	options: {
		plugins: {
			legend: {
				position: "bottom",
				align: "left",
				labels: {
					usePointStyle: true,
				},
			},
		},
	},
};
const pieChart = new Chart(document.getElementById("pieChart"), configpie);
// Doughnut ends

/// slider starts

jQuery(document).ready(function ($) {
	var timelines = $(".cd-horizontal-timeline"),
		eventsMinDistance = 60;

	timelines.length > 0 && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function () {
			var timeline = $(this),
				timelineComponents = {};
			timelineComponents["timelineWrapper"] = timeline.find(".events-wrapper");
			timelineComponents["eventsWrapper"] =
				timelineComponents["timelineWrapper"].children(".events");
			timelineComponents["fillingLine"] =
				timelineComponents["eventsWrapper"].children(".filling-line");
			timelineComponents["timelineEvents"] =
				timelineComponents["eventsWrapper"].find("a");
			timelineComponents["timelineDates"] = parseDate(
				timelineComponents["timelineEvents"]
			);
			timelineComponents["eventsMinLapse"] = minLapse(
				timelineComponents["timelineDates"]
			);
			timelineComponents["timelineNavigation"] = timeline.find(
				".cd-timeline-navigation"
			);
			timelineComponents["eventsContent"] =
				timeline.children(".events-content");
			setDatePosition(timelineComponents, eventsMinDistance);
			var timelineTotWidth = setTimelineWidth(
				timelineComponents,
				eventsMinDistance
			);
			timeline.addClass("loaded");
			timelineComponents["timelineNavigation"].on(
				"click",
				".next",
				function (event) {
					event.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, "next");
				}
			);
			timelineComponents["timelineNavigation"].on(
				"click",
				".prev",
				function (event) {
					event.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, "prev");
				}
			);
			timelineComponents["eventsWrapper"].on("click", "a", function (event) {
				event.preventDefault();
				timelineComponents["timelineEvents"].removeClass("selected");
				$(this).addClass("selected");
				updateOlderEvents($(this));
				updateFilling(
					$(this),
					timelineComponents["fillingLine"],
					timelineTotWidth
				);
				updateVisibleContent($(this), timelineComponents["eventsContent"]);
			});
			timelineComponents["eventsContent"].on("swipeleft", function () {
				var mq = checkMQ();
				mq == "mobile" &&
					showNewContent(timelineComponents, timelineTotWidth, "next");
			});
			timelineComponents["eventsContent"].on("swiperight", function () {
				var mq = checkMQ();
				mq == "mobile" &&
					showNewContent(timelineComponents, timelineTotWidth, "prev");
			});

			$(document).keyup(function (event) {
				if (event.which == "37" && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, "prev");
				} else if (event.which == "39" && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, "next");
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		var translateValue = getTranslateValue(timelineComponents["eventsWrapper"]),
			wrapperWidth = Number(
				timelineComponents["timelineWrapper"].css("width").replace("px", "")
			);
		string == "next"
			? translateTimeline(
					timelineComponents,
					translateValue - wrapperWidth + eventsMinDistance,
					wrapperWidth - timelineTotWidth
			  )
			: translateTimeline(
					timelineComponents,
					translateValue + wrapperWidth - eventsMinDistance
			  );
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		var visibleContent = timelineComponents["eventsContent"].find(".selected"),
			newContent =
				string == "next" ? visibleContent.next() : visibleContent.prev();

		if (newContent.length > 0) {
			var selectedDate = timelineComponents["eventsWrapper"].find(".selected"),
				newEvent =
					string == "next"
						? selectedDate.parent("li").next("li").children("a")
						: selectedDate.parent("li").prev("li").children("a");

			updateFilling(
				newEvent,
				timelineComponents["fillingLine"],
				timelineTotWidth
			);
			updateVisibleContent(newEvent, timelineComponents["eventsContent"]);
			newEvent.addClass("selected");
			selectedDate.removeClass("selected");
			updateOlderEvents(newEvent);
			updateTimelinePosition(
				string,
				newEvent,
				timelineComponents,
				timelineTotWidth
			);
		}
	}

	function updateTimelinePosition(
		string,
		event,
		timelineComponents,
		timelineTotWidth
	) {
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace("px", "")),
			timelineWidth = Number(
				timelineComponents["timelineWrapper"].css("width").replace("px", "")
			),
			timelineTotWidth = Number(
				timelineComponents["eventsWrapper"].css("width").replace("px", "")
			);
		var timelineTranslate = getTranslateValue(
			timelineComponents["eventsWrapper"]
		);

		if (
			(string == "next" && eventLeft > timelineWidth - timelineTranslate) ||
			(string == "prev" && eventLeft < -timelineTranslate)
		) {
			translateTimeline(
				timelineComponents,
				-eventLeft + timelineWidth / 2,
				timelineWidth - timelineTotWidth
			);
		}
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents["eventsWrapper"].get(0);
		value = value > 0 ? 0 : value;
		value =
			!(typeof totWidth === "undefined") && value < totWidth ? totWidth : value;
		setTransformValue(eventsWrapper, "translateX", value + "px");
		value == 0
			? timelineComponents["timelineNavigation"]
					.find(".prev")
					.addClass("inactive")
			: timelineComponents["timelineNavigation"]
					.find(".prev")
					.removeClass("inactive");
		value == totWidth
			? timelineComponents["timelineNavigation"]
					.find(".next")
					.addClass("inactive")
			: timelineComponents["timelineNavigation"]
					.find(".next")
					.removeClass("inactive");
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft =
			Number(eventLeft.replace("px", "")) +
			Number(eventWidth.replace("px", "")) / 2;
		var scaleValue = eventLeft / totWidth;
		setTransformValue(filling.get(0), "scaleX", scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents["timelineDates"].length; i++) {
			var distance = daydiff(
					timelineComponents["timelineDates"][0],
					timelineComponents["timelineDates"][i]
				),
				distanceNorm =
					Math.round(distance / timelineComponents["eventsMinLapse"]) + 2;
			timelineComponents["timelineEvents"]
				.eq(i)
				.css("left", distanceNorm * min + "px");
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(
				timelineComponents["timelineDates"][0],
				timelineComponents["timelineDates"][
					timelineComponents["timelineDates"].length - 1
				]
			),
			timeSpanNorm = timeSpan / timelineComponents["eventsMinLapse"],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm * width;
		timelineComponents["eventsWrapper"].css("width", totalWidth + "px");
		updateFilling(
			timelineComponents["timelineEvents"].eq(0),
			timelineComponents["fillingLine"],
			totalWidth
		);

		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data("date"),
			visibleContent = eventsContent.find(".selected"),
			selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = "selected enter-right",
				classLeaving = "leave-left";
		} else {
			var classEnetering = "selected enter-left",
				classLeaving = "leave-right";
		}

		selectedContent.attr("class", classEnetering);
		visibleContent
			.attr("class", classLeaving)
			.one(
				"webkitAnimationEnd oanimationend msAnimationEnd animationend",
				function () {
					visibleContent.removeClass("leave-right leave-left");
					selectedContent.removeClass("enter-left enter-right");
				}
			);
		eventsContent.css("height", selectedContentHeight + "px");
	}

	function updateOlderEvents(event) {
		event
			.parent("li")
			.prevAll("li")
			.children("a")
			.addClass("older-event")
			.end()
			.end()
			.nextAll("li")
			.children("a")
			.removeClass("older-event");
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate =
				timelineStyle.getPropertyValue("-webkit-transform") ||
				timelineStyle.getPropertyValue("-moz-transform") ||
				timelineStyle.getPropertyValue("-ms-transform") ||
				timelineStyle.getPropertyValue("-o-transform") ||
				timelineStyle.getPropertyValue("transform");

		if (timelineTranslate.indexOf("(") >= 0) {
			var timelineTranslate = timelineTranslate.split("(")[1];
			timelineTranslate = timelineTranslate.split(")")[0];
			timelineTranslate = timelineTranslate.split(",");
			var translateValue = timelineTranslate[4];
		} else {
			var translateValue = 0;
		}

		return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property + "(" + value + ")";
		element.style["-moz-transform"] = property + "(" + value + ")";
		element.style["-ms-transform"] = property + "(" + value + ")";
		element.style["-o-transform"] = property + "(" + value + ")";
		element.style["transform"] = property + "(" + value + ")";
	}
	function parseDate(events) {
		var dateArrays = [];
		events.each(function () {
			var dateComp = $(this).data("date").split("/"),
				newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
			dateArrays.push(newDate);
		});
		return dateArrays;
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function () {
			var singleDate = $(this),
				dateComp = singleDate.data("date").split("T");
			if (dateComp.length > 1) {
				var dayComp = dateComp[0].split("/"),
					timeComp = dateComp[1].split(":");
			} else if (dateComp[0].indexOf(":") >= 0) {
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(":");
			} else {
				var dayComp = dateComp[0].split("/"),
					timeComp = ["0", "0"];
			}
			var newDate = new Date(
				dayComp[2],
				dayComp[1] - 1,
				dayComp[0],
				timeComp[0],
				timeComp[1]
			);
			dateArrays.push(newDate);
		});
		return dateArrays;
	}

	function daydiff(first, second) {
		return Math.round(second - first);
	}

	function minLapse(dates) {
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) {
			var distance = daydiff(dates[i - 1], dates[i]);
			dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		return (
			top < window.pageYOffset + window.innerHeight &&
			left < window.pageXOffset + window.innerWidth &&
			top + height > window.pageYOffset &&
			left + width > window.pageXOffset
		);
	}

	function checkMQ() {
		return window
			.getComputedStyle(
				document.querySelector(".cd-horizontal-timeline"),
				"::before"
			)
			.getPropertyValue("content")
			.replace(/'/g, "")
			.replace(/"/g, "");
	}
});

// slider ends
