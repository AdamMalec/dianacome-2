const serviceEls = document.querySelectorAll(".service");
const reviewEls = document.querySelectorAll(".review");
const timelineEls = document.querySelectorAll(".timeline-content");
const timelineCounterEls = document.querySelectorAll(".timeline-circle");

const observerOptions = {
	rootMargin: "0% 0% -25% 0%",
};

const observerServices = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-fade-slide-top");
			observerServices.unobserve(entry.target);
		}
	}
}, observerOptions);

const observerReviews = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-fade-slide-top");
			observerReviews.unobserve(entry.target);
		}
	}
}, observerOptions);

const observerTimeline = new IntersectionObserver((entries) => {
	for (const entry of entries) {
		if (entry.isIntersecting) {
			let tlIndex = [...timelineEls].findIndex( item => item === entry.target);

			if (tlIndex % 2 !== 0) {
				entry.target.classList.add("animate-fade-slide-left");
				observerTimeline.unobserve(entry.target);
				setTimeout(() => {
					timelineCounterEls[tlIndex].style.backgroundColor = 'var(--color-bg-timeline)';
				}, 500);
			} else {
				entry.target.classList.add("animate-fade-slide-right");
				observerTimeline.unobserve(entry.target);
				setTimeout(() => {
					timelineCounterEls[tlIndex].style.backgroundColor = 'var(--color-bg-timeline)';
				}, 500);
			}
		}
	}
}, observerOptions);

serviceEls.forEach((el) => {
	observerServices.observe(el);
});

reviewEls.forEach((el) => {
	observerReviews.observe(el);
});

timelineEls.forEach((el) => {
	observerTimeline.observe(el);
});
