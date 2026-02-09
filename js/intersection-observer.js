const serviceEls = document.querySelectorAll(".service");
const reviewEls = document.querySelectorAll(".review");
const timelineEls = document.querySelectorAll(".timeline-content");
let tlIndex = 0;

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
			if (tlIndex % 2 !== 0) {
				entry.target.classList.add("animate-fade-slide-left");
				observerTimeline.unobserve(entry.target);
				setTimeout(() => {
					entry.target.nextElementSibling.firstElementChild.style.backgroundColor = 'var(--color-bg-timeline)';
				}, 500);
			} else {
				entry.target.classList.add("animate-fade-slide-right");
				observerTimeline.unobserve(entry.target);
				setTimeout(() => {
					entry.target.previousElementSibling.firstElementChild.style.backgroundColor = 'var(--color-bg-timeline)';
				}, 500);
			}
			tlIndex++;
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
