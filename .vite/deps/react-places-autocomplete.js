import {
  require_prop_types
} from "./chunk-2CMOOEJQ.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  require_lodash
} from "./chunk-IF2W4GXE.js";
import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/react-places-autocomplete/dist/helpers.js
var require_helpers = __commonJS({
  "node_modules/react-places-autocomplete/dist/helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var compose = exports.compose = function compose2() {
      for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
      }
      return function() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        fns.forEach(function(fn) {
          return fn && fn.apply(void 0, args);
        });
      };
    };
    var pick = exports.pick = function pick2(obj) {
      for (var _len3 = arguments.length, props = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        props[_key3 - 1] = arguments[_key3];
      }
      return props.reduce(function(newObj, prop) {
        if (obj && obj.hasOwnProperty(prop)) {
          newObj[prop] = obj[prop];
        }
        return newObj;
      }, {});
    };
  }
});

// node_modules/react-places-autocomplete/dist/PlacesAutocomplete.js
var require_PlacesAutocomplete = __commonJS({
  "node_modules/react-places-autocomplete/dist/PlacesAutocomplete.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _lodash = require_lodash();
    var _lodash2 = _interopRequireDefault(_lodash);
    var _helpers = require_helpers();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var formattedSuggestion = function formattedSuggestion2(structured_formatting) {
      return {
        mainText: structured_formatting.main_text,
        secondaryText: structured_formatting.secondary_text
      };
    };
    var PlacesAutocomplete = function(_React$Component) {
      _inherits(PlacesAutocomplete2, _React$Component);
      function PlacesAutocomplete2(props) {
        _classCallCheck(this, PlacesAutocomplete2);
        var _this = _possibleConstructorReturn(this, (PlacesAutocomplete2.__proto__ || Object.getPrototypeOf(PlacesAutocomplete2)).call(this, props));
        _this.init = function() {
          if (!window.google) {
            throw new Error("[react-places-autocomplete]: Google Maps JavaScript API library must be loaded. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library");
          }
          if (!window.google.maps.places) {
            throw new Error("[react-places-autocomplete]: Google Maps Places library must be loaded. Please add `libraries=places` to the src URL. See: https://github.com/kenny-hibino/react-places-autocomplete#load-google-library");
          }
          _this.autocompleteService = new window.google.maps.places.AutocompleteService();
          _this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK;
          _this.setState(function(state) {
            if (state.ready) {
              return null;
            } else {
              return { ready: true };
            }
          });
        };
        _this.autocompleteCallback = function(predictions, status) {
          _this.setState({ loading: false });
          if (status !== _this.autocompleteOK) {
            _this.props.onError(status, _this.clearSuggestions);
            return;
          }
          var highlightFirstSuggestion = _this.props.highlightFirstSuggestion;
          _this.setState({
            suggestions: predictions.map(function(p, idx) {
              return {
                id: p.id,
                description: p.description,
                placeId: p.place_id,
                active: highlightFirstSuggestion && idx === 0 ? true : false,
                index: idx,
                formattedSuggestion: formattedSuggestion(p.structured_formatting),
                matchedSubstrings: p.matched_substrings,
                terms: p.terms,
                types: p.types
              };
            })
          });
        };
        _this.fetchPredictions = function() {
          var value = _this.props.value;
          if (value.length) {
            _this.setState({ loading: true });
            _this.autocompleteService.getPlacePredictions(_extends({}, _this.props.searchOptions, {
              input: value
            }), _this.autocompleteCallback);
          }
        };
        _this.clearSuggestions = function() {
          _this.setState({ suggestions: [] });
        };
        _this.clearActive = function() {
          _this.setState({
            suggestions: _this.state.suggestions.map(function(suggestion) {
              return _extends({}, suggestion, {
                active: false
              });
            })
          });
        };
        _this.handleSelect = function(address, placeId, suggestion) {
          _this.clearSuggestions();
          if (_this.props.onSelect) {
            _this.props.onSelect(address, placeId, suggestion);
          } else {
            _this.props.onChange(address);
          }
        };
        _this.getActiveSuggestion = function() {
          return _this.state.suggestions.find(function(suggestion) {
            return suggestion.active;
          });
        };
        _this.selectActiveAtIndex = function(index) {
          var activeName = _this.state.suggestions.find(function(suggestion) {
            return suggestion.index === index;
          }).description;
          _this.setActiveAtIndex(index);
          _this.props.onChange(activeName);
        };
        _this.selectUserInputValue = function() {
          _this.clearActive();
          _this.props.onChange(_this.state.userInputValue);
        };
        _this.handleEnterKey = function() {
          var activeSuggestion = _this.getActiveSuggestion();
          if (activeSuggestion === void 0) {
            _this.handleSelect(_this.props.value, null, null);
          } else {
            _this.handleSelect(activeSuggestion.description, activeSuggestion.placeId, activeSuggestion);
          }
        };
        _this.handleDownKey = function() {
          if (_this.state.suggestions.length === 0) {
            return;
          }
          var activeSuggestion = _this.getActiveSuggestion();
          if (activeSuggestion === void 0) {
            _this.selectActiveAtIndex(0);
          } else if (activeSuggestion.index === _this.state.suggestions.length - 1) {
            _this.selectUserInputValue();
          } else {
            _this.selectActiveAtIndex(activeSuggestion.index + 1);
          }
        };
        _this.handleUpKey = function() {
          if (_this.state.suggestions.length === 0) {
            return;
          }
          var activeSuggestion = _this.getActiveSuggestion();
          if (activeSuggestion === void 0) {
            _this.selectActiveAtIndex(_this.state.suggestions.length - 1);
          } else if (activeSuggestion.index === 0) {
            _this.selectUserInputValue();
          } else {
            _this.selectActiveAtIndex(activeSuggestion.index - 1);
          }
        };
        _this.handleInputKeyDown = function(event) {
          switch (event.key) {
            case "Enter":
              event.preventDefault();
              _this.handleEnterKey();
              break;
            case "ArrowDown":
              event.preventDefault();
              _this.handleDownKey();
              break;
            case "ArrowUp":
              event.preventDefault();
              _this.handleUpKey();
              break;
            case "Escape":
              _this.clearSuggestions();
              break;
          }
        };
        _this.setActiveAtIndex = function(index) {
          _this.setState({
            suggestions: _this.state.suggestions.map(function(suggestion, idx) {
              if (idx === index) {
                return _extends({}, suggestion, { active: true });
              } else {
                return _extends({}, suggestion, { active: false });
              }
            })
          });
        };
        _this.handleInputChange = function(event) {
          var value = event.target.value;
          _this.props.onChange(value);
          _this.setState({ userInputValue: value });
          if (!value) {
            _this.clearSuggestions();
            return;
          }
          if (_this.props.shouldFetchSuggestions) {
            _this.debouncedFetchPredictions();
          }
        };
        _this.handleInputOnBlur = function() {
          if (!_this.mousedownOnSuggestion) {
            _this.clearSuggestions();
          }
        };
        _this.getActiveSuggestionId = function() {
          var activeSuggestion = _this.getActiveSuggestion();
          return activeSuggestion ? "PlacesAutocomplete__suggestion-" + activeSuggestion.placeId : void 0;
        };
        _this.getIsExpanded = function() {
          return _this.state.suggestions.length > 0;
        };
        _this.getInputProps = function() {
          var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (options.hasOwnProperty("value")) {
            throw new Error("[react-places-autocomplete]: getInputProps does not accept `value`. Use `value` prop instead");
          }
          if (options.hasOwnProperty("onChange")) {
            throw new Error("[react-places-autocomplete]: getInputProps does not accept `onChange`. Use `onChange` prop instead");
          }
          var defaultInputProps = {
            type: "text",
            autoComplete: "off",
            role: "combobox",
            "aria-autocomplete": "list",
            "aria-expanded": _this.getIsExpanded(),
            "aria-activedescendant": _this.getActiveSuggestionId(),
            disabled: !_this.state.ready
          };
          return _extends({}, defaultInputProps, options, {
            onKeyDown: (0, _helpers.compose)(_this.handleInputKeyDown, options.onKeyDown),
            onBlur: (0, _helpers.compose)(_this.handleInputOnBlur, options.onBlur),
            value: _this.props.value,
            onChange: function onChange(event) {
              _this.handleInputChange(event);
            }
          });
        };
        _this.getSuggestionItemProps = function(suggestion) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var handleSuggestionMouseEnter = _this.handleSuggestionMouseEnter.bind(_this, suggestion.index);
          var handleSuggestionClick = _this.handleSuggestionClick.bind(_this, suggestion);
          return _extends({}, options, {
            key: suggestion.id,
            id: _this.getActiveSuggestionId(),
            role: "option",
            onMouseEnter: (0, _helpers.compose)(handleSuggestionMouseEnter, options.onMouseEnter),
            onMouseLeave: (0, _helpers.compose)(_this.handleSuggestionMouseLeave, options.onMouseLeave),
            onMouseDown: (0, _helpers.compose)(_this.handleSuggestionMouseDown, options.onMouseDown),
            onMouseUp: (0, _helpers.compose)(_this.handleSuggestionMouseUp, options.onMouseUp),
            onTouchStart: (0, _helpers.compose)(_this.handleSuggestionTouchStart, options.onTouchStart),
            onTouchEnd: (0, _helpers.compose)(_this.handleSuggestionMouseUp, options.onTouchEnd),
            onClick: (0, _helpers.compose)(handleSuggestionClick, options.onClick)
          });
        };
        _this.handleSuggestionMouseEnter = function(index) {
          _this.setActiveAtIndex(index);
        };
        _this.handleSuggestionMouseLeave = function() {
          _this.mousedownOnSuggestion = false;
          _this.clearActive();
        };
        _this.handleSuggestionMouseDown = function(event) {
          event.preventDefault();
          _this.mousedownOnSuggestion = true;
        };
        _this.handleSuggestionTouchStart = function() {
          _this.mousedownOnSuggestion = true;
        };
        _this.handleSuggestionMouseUp = function() {
          _this.mousedownOnSuggestion = false;
        };
        _this.handleSuggestionClick = function(suggestion, event) {
          if (event && event.preventDefault) {
            event.preventDefault();
          }
          var description = suggestion.description, placeId = suggestion.placeId;
          _this.handleSelect(description, placeId, suggestion);
          setTimeout(function() {
            _this.mousedownOnSuggestion = false;
          });
        };
        _this.state = {
          loading: false,
          suggestions: [],
          userInputValue: props.value,
          ready: !props.googleCallbackName
        };
        _this.debouncedFetchPredictions = (0, _lodash2.default)(_this.fetchPredictions, props.debounce);
        return _this;
      }
      _createClass(PlacesAutocomplete2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var googleCallbackName = this.props.googleCallbackName;
          if (googleCallbackName) {
            var isPlacesLoaded = window.google && window.google.maps && window.google.maps.places;
            if (!isPlacesLoaded) {
              window[googleCallbackName] = this.init;
            } else {
              this.init();
            }
          } else {
            this.init();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var googleCallbackName = this.props.googleCallbackName;
          if (googleCallbackName && window[googleCallbackName]) {
            delete window[googleCallbackName];
          }
        }
      }, {
        key: "render",
        value: function render() {
          return this.props.children({
            getInputProps: this.getInputProps,
            getSuggestionItemProps: this.getSuggestionItemProps,
            loading: this.state.loading,
            suggestions: this.state.suggestions
          });
        }
      }]);
      return PlacesAutocomplete2;
    }(_react2.default.Component);
    PlacesAutocomplete.propTypes = {
      onChange: _propTypes2.default.func.isRequired,
      value: _propTypes2.default.string.isRequired,
      children: _propTypes2.default.func.isRequired,
      onError: _propTypes2.default.func,
      onSelect: _propTypes2.default.func,
      searchOptions: _propTypes2.default.shape({
        bounds: _propTypes2.default.object,
        componentRestrictions: _propTypes2.default.object,
        location: _propTypes2.default.object,
        offset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        radius: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        types: _propTypes2.default.array
      }),
      debounce: _propTypes2.default.number,
      highlightFirstSuggestion: _propTypes2.default.bool,
      shouldFetchSuggestions: _propTypes2.default.bool,
      googleCallbackName: _propTypes2.default.string
    };
    PlacesAutocomplete.defaultProps = {
      /* eslint-disable no-unused-vars, no-console */
      onError: function onError(status, _clearSuggestions) {
        return console.error("[react-places-autocomplete]: error happened when fetching data from Google Maps API.\nPlease check the docs here (https://developers.google.com/maps/documentation/javascript/places#place_details_responses)\nStatus: ", status);
      },
      /* eslint-enable no-unused-vars, no-console */
      searchOptions: {},
      debounce: 200,
      highlightFirstSuggestion: false,
      shouldFetchSuggestions: true
    };
    exports.default = PlacesAutocomplete;
  }
});

// node_modules/react-places-autocomplete/dist/utils.js
var require_utils = __commonJS({
  "node_modules/react-places-autocomplete/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var geocodeByAddress = exports.geocodeByAddress = function geocodeByAddress2(address) {
      var geocoder = new window.google.maps.Geocoder();
      var OK = window.google.maps.GeocoderStatus.OK;
      return new Promise(function(resolve, reject) {
        geocoder.geocode({ address }, function(results, status) {
          if (status !== OK) {
            reject(status);
          }
          resolve(results);
        });
      });
    };
    var getLatLng = exports.getLatLng = function getLatLng2(result) {
      return new Promise(function(resolve, reject) {
        try {
          var latLng = {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
          };
          resolve(latLng);
        } catch (e) {
          reject(e);
        }
      });
    };
    var geocodeByPlaceId = exports.geocodeByPlaceId = function geocodeByPlaceId2(placeId) {
      var geocoder = new window.google.maps.Geocoder();
      var OK = window.google.maps.GeocoderStatus.OK;
      return new Promise(function(resolve, reject) {
        geocoder.geocode({ placeId }, function(results, status) {
          if (status !== OK) {
            reject(status);
          }
          resolve(results);
        });
      });
    };
  }
});

// node_modules/react-places-autocomplete/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-places-autocomplete/dist/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getLatLng = exports.geocodeByPlaceId = exports.geocodeByAddress = void 0;
    var _PlacesAutocomplete = require_PlacesAutocomplete();
    var _PlacesAutocomplete2 = _interopRequireDefault(_PlacesAutocomplete);
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.geocodeByAddress = _utils.geocodeByAddress;
    exports.geocodeByPlaceId = _utils.geocodeByPlaceId;
    exports.getLatLng = _utils.getLatLng;
    exports.default = _PlacesAutocomplete2.default;
  }
});
export default require_dist();
//# sourceMappingURL=react-places-autocomplete.js.map
