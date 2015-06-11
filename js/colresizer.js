angular.module('colresizer', [])
        /**
         * @ngdoc object
         * @name colresizer
         * @description colresizer directive implements column resize of the HTML table.
         */
        .constant('colResizerConfig', {
            COL_RESIZER_MIN_COL_WIDTH: 35,
            ELEMENT_NODE_NAMES: ['TH', 'TD']
        })
        .directive('colResizer', ['$compile', '$document', '$timeout', 'colResizerConfig', function ($compile, $document, $timeout, colResizerConfig) {
                return {
                    restrict: 'A',
                    scope: {},
                    link: function (scope, element, attrs) {
                        var resizerStyle = 'position:absolute;border:1px solid transparent;background-color:transparent;top:0;bottom:0;right:0;width:6px;cursor:col-resize;';
                        var startPos = 0, nextElem = 0, currWidth = 0, nextWidth = 0, headerWidth = 0;

                        function onResizeStart(event) {
                            event.preventDefault();
                            startPos = event.clientX;
                            nextElem = element.next();
                            readElementWidths();

                            // Register events
                            $document.on('mousemove', onResizeMove);
                            $document.on('mouseup', onResizeEnd);
                            setCursor('col-resize');
                        }

                        function onResizeMove(event) {
                            // if newPos > 0 move id forward - if newPos < 0 move is backward
                            var newPos = event.clientX - startPos;
                            var newCurrWidth = currWidth + newPos;
                            var newNextWidth = nextWidth - newPos;
                            if (newPos > 0 && newNextWidth < colResizerConfig.COL_RESIZER_MIN_COL_WIDTH
                                    || newPos < 0 && newCurrWidth < colResizerConfig.COL_RESIZER_MIN_COL_WIDTH) {
                                return;
                            }
                            // Change to the percent value
                            element.css('width', (newCurrWidth / headerWidth * 100) + '%');
                            nextElem.css('width', (newNextWidth / headerWidth * 100) + '%');
                        }

                        function onResizeEnd() {
                            // Deregister events
                            $document.off('mousemove', onResizeMove);
                            $document.off('mouseup', onResizeEnd);
                            setCursor('default');
                        }

                        function readElementWidths() {
                            currWidth = element.prop('offsetWidth');
                            nextWidth = nextElem.prop('offsetWidth');
                            headerWidth = element.parent().prop('offsetWidth');
                        }

                        function setCursor(type) {
                            $document.prop('body').style.cursor = type;
                        }

                        function isRightElement() {
                            // Next element must by TH or TD element
                            var node = element.next().prop('nodeName');
                            if (angular.isUndefined(node)
                                    && !angular.equals(colResizerConfig.ELEMENT_NODE_NAMES[0].toUpperCase(), node.toUpperCase())
                                    && !angular.equals(colResizerConfig.ELEMENT_NODE_NAMES[1].toUpperCase(), node.toUpperCase())) {
                                return false;
                            }
                            return true;
                        }

                        function init() {
                            if (isRightElement()) {
                                var colResizer = angular.element('<div class="colresizer" ng-click="$event.stopPropagation()" style="' + resizerStyle + '"></div>');
                                colResizer.on('mousedown', onResizeStart);
                                element.css('background-clip', 'padding-box');
                                element.css('position', 'relative');
                                element.append(colResizer);
                                $compile(colResizer)(scope);
                            }
                        }

                        scope.$on('$destroy', function () {
                            var colResizer = element[0].querySelector('.colresizer');
                            angular.element(colResizer).off('mousedown', onResizeStart);
                        });

                        $timeout(init);
                    }
                };
            }]);



