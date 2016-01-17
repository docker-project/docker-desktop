var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var shortcut_1 = require('../shortcut/shortcut');
var window_1 = require('../panel/window');
var util_1 = require('../tools/util');
var EditorCmp = (function (_super) {
    __extends(EditorCmp, _super);
    function EditorCmp(elementRef) {
        var _this = this;
        _super.call(this);
        this.shortcuts = [];
        this.width = 744;
        this.height = 448;
        this.context = '';
        this._id = util_1.getUid(16);
        this.element = elementRef.nativeElement;
        this.setDialog();
        setTimeout(function () {
            _this.setEditor();
        }, 100);
        document.onkeydown = function (event) {
            if ((event.ctrlKey) && (event.keyCode == 115 || event.keyCode == 83 || event.keyCode == 87)) {
                event['returnValue'] = false;
                if (!_this.editor.isFocused())
                    return;
                _this.config.onSave && _this.config.onSave(_this.editor.getValue());
            }
        };
    }
    EditorCmp.prototype.setEditor = function () {
        var _this = this;
        console.log(this.config);
        this.editor = ace.edit(this._id);
        this.editor.setFontSize("14px");
        this.editor.setValue(this.config.context);
        setTimeout(function () {
            _this.editor.clearSelection();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], EditorCmp.prototype, "config", void 0);
    EditorCmp = __decorate([
        core_1.Component({
            selector: 'editor',
            template: window_1.windowTemplate.replace('{{__body__}}', "\n        <div class=\"body\" style=\"overflow-y: auto;height:100%;width:100%;padding-top: 30px;\">\n            <div id=\"{{_id}}\" style=\"height:100%;border-top:1px solid #ccc\" ></div>\n        </div>\n    "),
            styles: ["\n\n\n\n      .panel{\n      \tposition: absolute;\n      \tleft:100px;\n      \ttop:100px;\n      \tborder:1px solid #ccc;\n      \tbackground-color:#fff;\n      \tborder-radius:1px;\n      }\n\n\n      .panel .header{\n      \twidth:100%;\n          height:30px;\n          text-align: left;\n      \tbackground-color:#eee;\n      }\n\n      .panel.focus .header  {\n      \tbackground-color:rgba(138,165,204,1);\n      }\n\n      .panel.focus  {\n      \tborder-color:rgba(138,165,204,1);\n      }\n\n      .panel .header .icon{\n          height: 20px;   \t\n          width: 20px;\n          float: left;\n          margin: 4px;\n          background-size: 20px 20px;\n      }\n\n      .panel .header .title{\n          padding-top: 5px;\n          float: left;\n      }\n\n      .panel-title-buttons {\n\n          height:40px;\n          float: right;\n      \tmargin-top: 2px;\n      \tmargin-right: 2px\n      }\n\n\n      .panel-btn {\n          float: right;\n          margin-right: 10px;\n          margin-top: 7px;\n          width:85px;\n          font-size:13px;\n\t\n      }\n\n      .icon-min{\n          background-image:url(../../resource/images/icon/min2.png);\n          width:40px;\n          height:19px;\n          float: left;\n      }\n      .icon-max{\n          background-image:url(../../resource/images/icon/max2.png);\n          width:40px;\n          height:19px;\n          float: left;\n      }\n      .icon-close{\n          background-image:url(../../resource/images/icon/close2.png);\n          width:40px;\n          height:19px;\n          float: left;\n      }\n\n      .icon-min:hover{\n      \tbackground-image:url(../../resource/images/icon/min.png);\n      }\n\n      .icon-max:hover{\n      \tbackground-image:url(../../resource/images/icon/max.png);\n      }\n\n      .icon-close:hover{\n      \tbackground-image:url(../../resource/images/icon/close.png);\n      }\n\n      /*window*/\n      .panel .design-resize-left, .design-resize-right  , .design-resize-bottom , .design-resize-left-bottom , .design-resize-right-bottom{\n      \tbackground:#b7bfca;\n      \tfloat: left;\n      \tposition: absolute;\n      \topacity: 0;                /* Firefox, Safari(WebKit), Opera,chrome/    filter: \"alpha(opacity=60)\"; /* IE 8 */\n      \tfilter: alpha(opacity=0);   /* IE 4-7 */\n      }\n      .design-resize-left{\n      \twidth:4px;\n      \theight: 100%;\n      \tcursor:e-resize; \n      \tleft:0px;\n      \ttop:0px;\n      }\n      .design-resize-right{\n      \twidth:4px;\n      \theight: 100%;\n      \tcursor:e-resize; \n      \tright:0px;\n      \ttop:0px;\n      }\n      .design-resize-bottom{\n      \theight:4px;\n      \twidth:100%;\n      \tcursor:n-resize;\n      \toverflow:hidden; \n      \tleft:0px;\n      \tbottom:0px;\n      }\n      .design-resize-left-bottom{\n      \theight:4px;\n      \twidth:4px;\n      \tcursor:sw-resize; \n      \tleft:0px;\n      \tbottom:0px;\n      }\n      .design-resize-right-bottom{\n      \theight:4px;\n      \twidth:4px;\n      \tcursor:se-resize; \n      \tright:0px;\n      \tbottom:0px;\n      }\n    "],
            directives: [common_1.NgStyle, shortcut_1.ShortcutCmp]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], EditorCmp);
    return EditorCmp;
})(window_1.WindowCmp);
exports.EditorCmp = EditorCmp;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlc2t0b3AvYXBwbGljYXRpb24vZWRpdG9yLnRzIl0sIm5hbWVzIjpbIkVkaXRvckNtcCIsIkVkaXRvckNtcC5jb25zdHJ1Y3RvciIsIkVkaXRvckNtcC5zZXRFZGl0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBQ25FLHVCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDLHlCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHVCQUEwQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQzVELHFCQUFxQixlQUFlLENBQUMsQ0FBQTtBQUtyQztJQWtKK0JBLDZCQUFTQTtJQVN2Q0EsbUJBQWdDQSxVQUFzQkE7UUEzSnZEQyxpQkFnTUNBO1FBbkNPQSxpQkFBT0EsQ0FBQUE7UUFWWEEsY0FBU0EsR0FBR0EsRUFBRUEsQ0FBQUE7UUFHZEEsVUFBS0EsR0FBR0EsR0FBR0EsQ0FBQUE7UUFDZEEsV0FBTUEsR0FBR0EsR0FBR0EsQ0FBQUE7UUFFVEEsWUFBT0EsR0FBR0EsRUFBRUEsQ0FBQUE7UUFDWkEsUUFBR0EsR0FBR0EsYUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQUE7UUFJWkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsVUFBVUEsQ0FBQ0EsYUFBYUEsQ0FBQUE7UUFDdkNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUFBO1FBRWhCQSxVQUFVQSxDQUFDQTtZQUNQQSxLQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFBQTtRQUNwQkEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFHUkEsUUFBUUEsQ0FBQ0EsU0FBU0EsR0FBR0EsVUFBQ0EsS0FBS0E7WUFFdkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLElBQUVBLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLElBQUVBLEdBQUdBLElBQUlBLEtBQUtBLENBQUNBLE9BQU9BLElBQUVBLEVBQUVBLElBQUdBLEtBQUtBLENBQUNBLE9BQU9BLElBQUVBLEVBQUVBLENBQUNBLENBQUNBLENBQ25GQSxDQUFDQTtnQkFDR0EsS0FBS0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBRTdCQSxFQUFFQSxDQUFBQSxDQUFFQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFHQSxDQUFDQTtvQkFDMUJBLE1BQU1BLENBQUFBO2dCQUVWQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxJQUFJQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFBQTtZQUNwRUEsQ0FBQ0E7UUFDTEEsQ0FBQ0EsQ0FBQUE7SUFFUkEsQ0FBQ0E7SUFDRUQsNkJBQVNBLEdBQVRBO1FBQUFFLGlCQVdDQTtRQVZHQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFBQTtRQUN4QkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLENBQUFBO1FBRy9CQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFBQTtRQUV6Q0EsVUFBVUEsQ0FBQ0E7WUFDUEEsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQUE7UUFDaENBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0lBMUNERjtRQUFDQSxZQUFLQSxFQUFFQTs7T0FBQ0EsNkJBQU1BLFVBQUFBO0lBckpuQkE7UUFBQ0EsZ0JBQVNBLENBQUNBO1lBQ1BBLFFBQVFBLEVBQUVBLFFBQVFBO1lBQ2xCQSxRQUFRQSxFQUFFQSx1QkFBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsY0FBY0EsRUFBQ0Esb05BSS9DQSxDQUFDQTtZQUNGQSxNQUFNQSxFQUFFQSxDQUFDQSwwaUdBdUlSQSxDQUFDQTtZQUNGQSxVQUFVQSxFQUFFQSxDQUFDQSxnQkFBT0EsRUFBRUEsc0JBQVdBLENBQUNBO1NBQ3JDQSxDQUFDQTtRQVdXQSxXQUFDQSxhQUFNQSxDQUFDQSxpQkFBVUEsQ0FBQ0EsQ0FBQUE7O2tCQXFDL0JBO0lBQURBLGdCQUFDQTtBQUFEQSxDQWhNQSxBQWdNQ0EsRUE5QzhCLGtCQUFTLEVBOEN2QztBQTlDWSxpQkFBUyxZQThDckIsQ0FBQSIsImZpbGUiOiJkZXNrdG9wL2FwcGxpY2F0aW9uL2VkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3QsIEVsZW1lbnRSZWYsIElucHV0fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TmdTdHlsZX0gZnJvbSAnYW5ndWxhcjIvY29tbW9uJztcbmltcG9ydCB7ZGlhbG9nfSBmcm9tICcuLi90b29scy91dGlsJztcbmltcG9ydCB7IFNob3J0Y3V0Q21wIH0gZnJvbSAnLi4vc2hvcnRjdXQvc2hvcnRjdXQnO1xuaW1wb3J0IHsgV2luZG93Q21wLCB3aW5kb3dUZW1wbGF0ZSB9IGZyb20gJy4uL3BhbmVsL3dpbmRvdyc7XG5pbXBvcnQge2dldFVpZH0gZnJvbSAnLi4vdG9vbHMvdXRpbCc7XG5cbmRlY2xhcmUgdmFyICQsIGFjZVxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogd2luZG93VGVtcGxhdGUucmVwbGFjZSgne3tfX2JvZHlfX319JyxgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJib2R5XCIgc3R5bGU9XCJvdmVyZmxvdy15OiBhdXRvO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cGFkZGluZy10b3A6IDMwcHg7XCI+XG4gICAgICAgICAgICA8ZGl2IGlkPVwie3tfaWR9fVwiIHN0eWxlPVwiaGVpZ2h0OjEwMCU7Ym9yZGVyLXRvcDoxcHggc29saWQgI2NjY1wiID48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCksXG4gICAgc3R5bGVzOiBbYFxuXG5cblxuICAgICAgLnBhbmVse1xuICAgICAgXHRwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBcdGxlZnQ6MTAwcHg7XG4gICAgICBcdHRvcDoxMDBweDtcbiAgICAgIFx0Ym9yZGVyOjFweCBzb2xpZCAjY2NjO1xuICAgICAgXHRiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7XG4gICAgICBcdGJvcmRlci1yYWRpdXM6MXB4O1xuICAgICAgfVxuXG5cbiAgICAgIC5wYW5lbCAuaGVhZGVye1xuICAgICAgXHR3aWR0aDoxMDAlO1xuICAgICAgICAgIGhlaWdodDozMHB4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICBcdGJhY2tncm91bmQtY29sb3I6I2VlZTtcbiAgICAgIH1cblxuICAgICAgLnBhbmVsLmZvY3VzIC5oZWFkZXIgIHtcbiAgICAgIFx0YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEzOCwxNjUsMjA0LDEpO1xuICAgICAgfVxuXG4gICAgICAucGFuZWwuZm9jdXMgIHtcbiAgICAgIFx0Ym9yZGVyLWNvbG9yOnJnYmEoMTM4LDE2NSwyMDQsMSk7XG4gICAgICB9XG5cbiAgICAgIC5wYW5lbCAuaGVhZGVyIC5pY29ue1xuICAgICAgICAgIGhlaWdodDogMjBweDsgICBcdFxuICAgICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgIG1hcmdpbjogNHB4O1xuICAgICAgICAgIGJhY2tncm91bmQtc2l6ZTogMjBweCAyMHB4O1xuICAgICAgfVxuXG4gICAgICAucGFuZWwgLmhlYWRlciAudGl0bGV7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDVweDtcbiAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgIH1cblxuICAgICAgLnBhbmVsLXRpdGxlLWJ1dHRvbnMge1xuXG4gICAgICAgICAgaGVpZ2h0OjQwcHg7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgXHRtYXJnaW4tdG9wOiAycHg7XG4gICAgICBcdG1hcmdpbi1yaWdodDogMnB4XG4gICAgICB9XG5cblxuICAgICAgLnBhbmVsLWJ0biB7XG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiA3cHg7XG4gICAgICAgICAgd2lkdGg6ODVweDtcbiAgICAgICAgICBmb250LXNpemU6MTNweDtcblx0XG4gICAgICB9XG5cbiAgICAgIC5pY29uLW1pbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOnVybCguLi8uLi9yZXNvdXJjZS9pbWFnZXMvaWNvbi9taW4yLnBuZyk7XG4gICAgICAgICAgd2lkdGg6NDBweDtcbiAgICAgICAgICBoZWlnaHQ6MTlweDtcbiAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgIH1cbiAgICAgIC5pY29uLW1heHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOnVybCguLi8uLi9yZXNvdXJjZS9pbWFnZXMvaWNvbi9tYXgyLnBuZyk7XG4gICAgICAgICAgd2lkdGg6NDBweDtcbiAgICAgICAgICBoZWlnaHQ6MTlweDtcbiAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgIH1cbiAgICAgIC5pY29uLWNsb3Nle1xuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKC4uLy4uL3Jlc291cmNlL2ltYWdlcy9pY29uL2Nsb3NlMi5wbmcpO1xuICAgICAgICAgIHdpZHRoOjQwcHg7XG4gICAgICAgICAgaGVpZ2h0OjE5cHg7XG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLW1pbjpob3ZlcntcbiAgICAgIFx0YmFja2dyb3VuZC1pbWFnZTp1cmwoLi4vLi4vcmVzb3VyY2UvaW1hZ2VzL2ljb24vbWluLnBuZyk7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLW1heDpob3ZlcntcbiAgICAgIFx0YmFja2dyb3VuZC1pbWFnZTp1cmwoLi4vLi4vcmVzb3VyY2UvaW1hZ2VzL2ljb24vbWF4LnBuZyk7XG4gICAgICB9XG5cbiAgICAgIC5pY29uLWNsb3NlOmhvdmVye1xuICAgICAgXHRiYWNrZ3JvdW5kLWltYWdlOnVybCguLi8uLi9yZXNvdXJjZS9pbWFnZXMvaWNvbi9jbG9zZS5wbmcpO1xuICAgICAgfVxuXG4gICAgICAvKndpbmRvdyovXG4gICAgICAucGFuZWwgLmRlc2lnbi1yZXNpemUtbGVmdCwgLmRlc2lnbi1yZXNpemUtcmlnaHQgICwgLmRlc2lnbi1yZXNpemUtYm90dG9tICwgLmRlc2lnbi1yZXNpemUtbGVmdC1ib3R0b20gLCAuZGVzaWduLXJlc2l6ZS1yaWdodC1ib3R0b217XG4gICAgICBcdGJhY2tncm91bmQ6I2I3YmZjYTtcbiAgICAgIFx0ZmxvYXQ6IGxlZnQ7XG4gICAgICBcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIFx0b3BhY2l0eTogMDsgICAgICAgICAgICAgICAgLyogRmlyZWZveCwgU2FmYXJpKFdlYktpdCksIE9wZXJhLGNocm9tZS8gICAgZmlsdGVyOiBcImFscGhhKG9wYWNpdHk9NjApXCI7IC8qIElFIDggKi9cbiAgICAgIFx0ZmlsdGVyOiBhbHBoYShvcGFjaXR5PTApOyAgIC8qIElFIDQtNyAqL1xuICAgICAgfVxuICAgICAgLmRlc2lnbi1yZXNpemUtbGVmdHtcbiAgICAgIFx0d2lkdGg6NHB4O1xuICAgICAgXHRoZWlnaHQ6IDEwMCU7XG4gICAgICBcdGN1cnNvcjplLXJlc2l6ZTsgXG4gICAgICBcdGxlZnQ6MHB4O1xuICAgICAgXHR0b3A6MHB4O1xuICAgICAgfVxuICAgICAgLmRlc2lnbi1yZXNpemUtcmlnaHR7XG4gICAgICBcdHdpZHRoOjRweDtcbiAgICAgIFx0aGVpZ2h0OiAxMDAlO1xuICAgICAgXHRjdXJzb3I6ZS1yZXNpemU7IFxuICAgICAgXHRyaWdodDowcHg7XG4gICAgICBcdHRvcDowcHg7XG4gICAgICB9XG4gICAgICAuZGVzaWduLXJlc2l6ZS1ib3R0b217XG4gICAgICBcdGhlaWdodDo0cHg7XG4gICAgICBcdHdpZHRoOjEwMCU7XG4gICAgICBcdGN1cnNvcjpuLXJlc2l6ZTtcbiAgICAgIFx0b3ZlcmZsb3c6aGlkZGVuOyBcbiAgICAgIFx0bGVmdDowcHg7XG4gICAgICBcdGJvdHRvbTowcHg7XG4gICAgICB9XG4gICAgICAuZGVzaWduLXJlc2l6ZS1sZWZ0LWJvdHRvbXtcbiAgICAgIFx0aGVpZ2h0OjRweDtcbiAgICAgIFx0d2lkdGg6NHB4O1xuICAgICAgXHRjdXJzb3I6c3ctcmVzaXplOyBcbiAgICAgIFx0bGVmdDowcHg7XG4gICAgICBcdGJvdHRvbTowcHg7XG4gICAgICB9XG4gICAgICAuZGVzaWduLXJlc2l6ZS1yaWdodC1ib3R0b217XG4gICAgICBcdGhlaWdodDo0cHg7XG4gICAgICBcdHdpZHRoOjRweDtcbiAgICAgIFx0Y3Vyc29yOnNlLXJlc2l6ZTsgXG4gICAgICBcdHJpZ2h0OjBweDtcbiAgICAgIFx0Ym90dG9tOjBweDtcbiAgICAgIH1cbiAgICBgXSxcbiAgICBkaXJlY3RpdmVzOiBbTmdTdHlsZSwgU2hvcnRjdXRDbXBdXG59KVxuXG5leHBvcnQgY2xhc3MgRWRpdG9yQ21wIGV4dGVuZHMgV2luZG93Q21wIHtcbiAgICBzaG9ydGN1dHMgPSBbXSBcbiAgICBlbGVtZW50OiBhbnlcbiAgICBASW5wdXQoKSBjb25maWdcbiAgICB3aWR0aCA9IDc0NFxuXHRoZWlnaHQgPSA0NDhcbiAgICBlZGl0b3I6IGFueVxuICAgIGNvbnRleHQgPSAnJ1xuICAgIF9pZCA9IGdldFVpZCgxNilcblx0Y29uc3RydWN0b3IoQEluamVjdChFbGVtZW50UmVmKSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKXtcbiAgICAgICAgXG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgIHRoaXMuc2V0RGlhbG9nKClcbiAgICAgICAgXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEVkaXRvcigpXG4gICAgICAgIH0sIDEwMCk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gKGV2ZW50KT0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICgoZXZlbnQuY3RybEtleSkmJihldmVudC5rZXlDb2RlPT0xMTUgfHwgZXZlbnQua2V5Q29kZT09ODN8fCBldmVudC5rZXlDb2RlPT04NykpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXZlbnRbJ3JldHVyblZhbHVlJ10gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmKCAhdGhpcy5lZGl0b3IuaXNGb2N1c2VkKCkgKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm9uU2F2ZSAmJiB0aGlzLmNvbmZpZy5vblNhdmUodGhpcy5lZGl0b3IuZ2V0VmFsdWUoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblx0fVxuICAgIHNldEVkaXRvcigpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZylcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBhY2UuZWRpdCh0aGlzLl9pZCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNldEZvbnRTaXplKFwiMTRweFwiKVxuICAgICAgICAvLyB0aGlzLmVkaXRvci5zZXRUaGVtZShcImFjZS90aGVtZS9lY2xpcHNlXCIpO1xuICAgICAgICAvLyB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShcImFjZS9tb2RlL2FiY1wiKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0VmFsdWUodGhpcy5jb25maWcuY29udGV4dClcbiAgICAgICAgLy8gdGhpcy5lZGl0b3IuZm9jdXMoKVxuICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuY2xlYXJTZWxlY3Rpb24oKVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==