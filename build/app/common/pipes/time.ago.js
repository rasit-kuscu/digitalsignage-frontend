System.register(['@angular2/core', 'rxjs/Observable', '@angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, Observable_1, common_1;
    var MessageTimePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MessageTimePipe = (function (_super) {
                __extends(MessageTimePipe, _super);
                function MessageTimePipe(ref) {
                    _super.call(this, ref);
                }
                MessageTimePipe.prototype.transform = function (obj, args) {
                    if (obj instanceof Date) {
                        this.value = obj;
                        if (!this.timer) {
                            this.timer = this.getObservable();
                        }
                        return _super.prototype.transform.call(this, this.timer, args);
                    }
                    return _super.prototype.transform.call(this, obj, args);
                };
                MessageTimePipe.prototype.getObservable = function () {
                    var _this = this;
                    return Observable_1.Observable.interval(1000).startWith(0).map(function () {
                        var result;
                        // current time
                        var now = new Date().getTime();
                        // time since message was sent in seconds
                        var delta = (now - _this.value.getTime()) / 1000;
                        // format string
                        if (delta < 10) {
                            result = 'jetzt';
                        }
                        else if (delta < 60) {
                            result = 'vor ' + Math.floor(delta) + ' Sekunden';
                        }
                        else if (delta < 3600) {
                            result = 'vor ' + Math.floor(delta / 60) + ' Minuten';
                        }
                        else if (delta < 86400) {
                            result = 'vor ' + Math.floor(delta / 3600) + ' Stunden';
                        }
                        else {
                            result = 'vor ' + Math.floor(delta / 86400) + ' Tagen';
                        }
                        return result;
                    });
                };
                MessageTimePipe = __decorate([
                    core_1.Pipe({
                        name: 'messageTime',
                        pure: false
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ChangeDetectorRef !== 'undefined' && core_1.ChangeDetectorRef) === 'function' && _a) || Object])
                ], MessageTimePipe);
                return MessageTimePipe;
                var _a;
            }(common_1.AsyncPipe));
            exports_1("MessageTimePipe", MessageTimePipe);
        }
    }
});

//# sourceMappingURL=time.ago.js.map
