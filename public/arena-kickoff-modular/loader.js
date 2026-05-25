(function () {
    'use strict';

    var TOTAL_SLIDES = 17;
    var SLIDE_BASE = 'arena-kickoff-modular/slides/';

    function buildSlidePath(index) {
        var fileName = String(index).padStart(2, '0') + '.html';
        return SLIDE_BASE + fileName;
    }

    function loadSlide(index) {
        return fetch(buildSlidePath(index)).then(function (response) {
            if (!response.ok) {
                throw new Error('Slide ' + index + ' konnte nicht geladen werden.');
            }
            return response.text();
        });
    }

    function loadAllSlides() {
        var requests = [];

        for (var i = 1; i <= TOTAL_SLIDES; i += 1) {
            requests.push(loadSlide(i));
        }

        return Promise.all(requests);
    }

    function createOverviewStep() {
        var overview = document.createElement('div');
        overview.id = 'overview';
        overview.className = 'step';
        overview.setAttribute('data-x', '10000');
        overview.setAttribute('data-y', '0');
        overview.setAttribute('data-z', '-5000');
        overview.setAttribute('data-scale', '8');
        overview.style.pointerEvents = 'none';
        overview.style.background = 'transparent';
        overview.style.border = 'none';
        overview.style.boxShadow = 'none';
        return overview;
    }

    function initPresentation() {
        impress().init();

        document.addEventListener('keyup', function (event) {
            if (event.key === 'Escape') {
                impress().goto('overview');
            }
        });

        var hintShown = true;
        document.addEventListener('keydown', function () {
            if (!hintShown) {
                return;
            }

            setTimeout(function () {
                var hint = document.querySelector('.hint');
                if (hint) {
                    hint.style.opacity = '0.3';
                }
            }, 5000);

            hintShown = false;
        });
    }

    function showLoadError(error) {
        var host = document.getElementById('impress');
        if (!host) {
            return;
        }

        host.innerHTML = [
            '<div style="max-width: 760px; margin: 80px auto; padding: 24px; border-radius: 12px; border: 1px solid rgba(239,68,68,0.4); background: rgba(127,29,29,0.2);">',
            '<h2 style="margin: 0 0 12px; color: #fca5a5;">Slides konnten nicht geladen werden</h2>',
            '<p style="margin: 0; color: #fecaca;">',
            error.message,
            '</p>',
            '</div>'
        ].join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var impressRoot = document.getElementById('impress');
        if (!impressRoot) {
            return;
        }

        loadAllSlides()
            .then(function (slideMarkupList) {
                impressRoot.innerHTML = slideMarkupList.join('\n\n');
                impressRoot.appendChild(createOverviewStep());
                initPresentation();
            })
            .catch(showLoadError);
    });
}());
