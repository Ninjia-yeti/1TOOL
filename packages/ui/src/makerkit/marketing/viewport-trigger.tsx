'use client';
import $ from 'jquery';
import React, { useEffect } from 'react';

export function ViewportTrigger(): JSX.Element {
    useEffect(() => {
        $(document).ready(function () {
            const $animationElements = $('.animation-element');
            const $window = $(window);

            const isMobile = window.matchMedia('only screen and (max-width: 768px)');
            if (isMobile.matches) {
                $animationElements.removeClass('animation-element');
            }

            function checkIfInView() {
                const windowHeight = $window.height() || 0;
                const windowTopPosition = $window.scrollTop() || 0;
                const windowBottomPosition = windowTopPosition + windowHeight;

                $animationElements.each(function () {
                    const $element = $(this);
                    const elementHeight = $element.outerHeight() || 0;
                    const elementTopPosition = $element.offset()?.top || 0;
                    const elementBottomPosition = elementTopPosition + elementHeight;

                    if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                        $element.addClass('in-view');
                    } else {
                        $element.removeClass('in-view');
                    }
                });
            }

            $window.on('scroll resize', checkIfInView);
            $window.trigger('scroll');
        });
    }, []);

    return <div></div>;
}