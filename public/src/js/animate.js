export default function animateCSS(element, animation) {
    return new Promise((resolve) => {
        const animationName = animation;
        element.classList.add('animated', animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            element.remove();
            resolve('Animation ended');
        }

        element.addEventListener('animationend', handleAnimationEnd, { once: true });
    });
}
