import {
  Button_default
} from "./chunk-JVRN4ZUQ.js";
import {
  CircularProgress_default
} from "./chunk-JPZVJJ3E.js";
import "./chunk-OGFVHOXD.js";
import "./chunk-D36YRMCG.js";
import "./chunk-LQHJAPLN.js";
import "./chunk-36USVHPP.js";
import "./chunk-BNIK2AUT.js";
import "./chunk-5SZXYZTF.js";
import {
  useId_default
} from "./chunk-EDQZ3PMS.js";
import "./chunk-JLSLPL4B.js";
import "./chunk-ZSA6EGSN.js";
import "./chunk-NP3OWEJ3.js";
import "./chunk-4EF566ZQ.js";
import "./chunk-RXGDTOTH.js";
import "./chunk-VQ6DFLGM.js";
import "./chunk-PFZ42PES.js";
import "./chunk-55NDJUPW.js";
import {
  capitalize_default
} from "./chunk-SRJVOYDD.js";
import "./chunk-PUPOOQ6M.js";
import "./chunk-76V4V2KD.js";
import "./chunk-7SO26J3D.js";
import "./chunk-XAWTPI7E.js";
import "./chunk-W3VT5O72.js";
import "./chunk-EE4TPZMF.js";
import "./chunk-434IGKTH.js";
import "./chunk-ALJHO7VG.js";
import "./chunk-IMCWWOGW.js";
import "./chunk-VPB6KAEJ.js";
import {
  styled_default
} from "./chunk-QOYICO4W.js";
import {
  useThemeProps
} from "./chunk-6F25EX6R.js";
import "./chunk-BMCBGW7S.js";
import "./chunk-WKWQPAVO.js";
import "./chunk-SYQ7DUOR.js";
import "./chunk-T22YZR45.js";
import "./chunk-OTY6O57J.js";
import "./chunk-CCRBYHLB.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PSGUSLG5.js";
import {
  require_jsx_runtime
} from "./chunk-F7RKNM7B.js";
import {
  chainPropTypes
} from "./chunk-NWNPM2ZU.js";
import "./chunk-RPXFFOYT.js";
import "./chunk-ZTXVWYLJ.js";
import "./chunk-D25FWIIA.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses
} from "./chunk-HA5N2SSD.js";
import "./chunk-HHFWMVFQ.js";
import {
  _extends,
  init_extends
} from "./chunk-BJM7UO3E.js";
import {
  require_prop_types
} from "./chunk-2CMOOEJQ.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/lab/LoadingButton/LoadingButton.js
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/lab/LoadingButton/loadingButtonClasses.js
function getLoadingButtonUtilityClass(slot) {
  return generateUtilityClass("MuiLoadingButton", slot);
}
var loadingButtonClasses = generateUtilityClasses("MuiLoadingButton", ["root", "loading", "loadingIndicator", "loadingIndicatorCenter", "loadingIndicatorStart", "loadingIndicatorEnd", "endIconLoadingEnd", "startIconLoadingStart"]);
var loadingButtonClasses_default = loadingButtonClasses;

// node_modules/@mui/lab/LoadingButton/LoadingButton.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["children", "disabled", "id", "loading", "loadingIndicator", "loadingPosition", "variant"];
var useUtilityClasses = (ownerState) => {
  const {
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ["root", loading && "loading"],
    startIcon: [loading && `startIconLoading${capitalize_default(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize_default(loadingPosition)}`],
    loadingIndicator: ["loadingIndicator", loading && `loadingIndicator${capitalize_default(loadingPosition)}`]
  };
  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var rootShouldForwardProp = (prop) => prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as" && prop !== "classes";
var LoadingButtonRoot = styled_default(Button_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiLoadingButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    return [styles.root, styles.startIconLoadingStart && {
      [`& .${loadingButtonClasses_default.startIconLoadingStart}`]: styles.startIconLoadingStart
    }, styles.endIconLoadingEnd && {
      [`& .${loadingButtonClasses_default.endIconLoadingEnd}`]: styles.endIconLoadingEnd
    }];
  }
})(({
  ownerState,
  theme
}) => _extends({
  [`& .${loadingButtonClasses_default.startIconLoadingStart}, & .${loadingButtonClasses_default.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  }
}, ownerState.loadingPosition === "center" && {
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short
  }),
  [`&.${loadingButtonClasses_default.loading}`]: {
    color: "transparent"
  }
}, ownerState.loadingPosition === "start" && ownerState.fullWidth && {
  [`& .${loadingButtonClasses_default.startIconLoadingStart}, & .${loadingButtonClasses_default.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    marginRight: -8
  }
}, ownerState.loadingPosition === "end" && ownerState.fullWidth && {
  [`& .${loadingButtonClasses_default.startIconLoadingStart}, & .${loadingButtonClasses_default.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(["opacity"], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    marginLeft: -8
  }
}));
var LoadingButtonLoadingIndicator = styled_default("span", {
  name: "MuiLoadingButton",
  slot: "LoadingIndicator",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.loadingIndicator, styles[`loadingIndicator${capitalize_default(ownerState.loadingPosition)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "absolute",
  visibility: "visible",
  display: "flex"
}, ownerState.loadingPosition === "start" && (ownerState.variant === "outlined" || ownerState.variant === "contained") && {
  left: ownerState.size === "small" ? 10 : 14
}, ownerState.loadingPosition === "start" && ownerState.variant === "text" && {
  left: 6
}, ownerState.loadingPosition === "center" && {
  left: "50%",
  transform: "translate(-50%)",
  color: (theme.vars || theme).palette.action.disabled
}, ownerState.loadingPosition === "end" && (ownerState.variant === "outlined" || ownerState.variant === "contained") && {
  right: ownerState.size === "small" ? 10 : 14
}, ownerState.loadingPosition === "end" && ownerState.variant === "text" && {
  right: 6
}, ownerState.loadingPosition === "start" && ownerState.fullWidth && {
  position: "relative",
  left: -10
}, ownerState.loadingPosition === "end" && ownerState.fullWidth && {
  position: "relative",
  right: -10
}));
var LoadingButton = React.forwardRef(function LoadingButton2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiLoadingButton"
  });
  const {
    children,
    disabled = false,
    id: idProp,
    loading = false,
    loadingIndicator: loadingIndicatorProp,
    loadingPosition = "center",
    variant = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const id = useId_default(idProp);
  const loadingIndicator = loadingIndicatorProp != null ? loadingIndicatorProp : (0, import_jsx_runtime.jsx)(CircularProgress_default, {
    "aria-labelledby": id,
    color: "inherit",
    size: 16
  });
  const ownerState = _extends({}, props, {
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  const loadingButtonLoadingIndicator = loading ? (0, import_jsx_runtime.jsx)(LoadingButtonLoadingIndicator, {
    className: classes.loadingIndicator,
    ownerState,
    children: loadingIndicator
  }) : null;
  return (0, import_jsx_runtime2.jsxs)(LoadingButtonRoot, _extends({
    disabled: disabled || loading,
    id,
    ref
  }, other, {
    variant,
    classes,
    ownerState,
    children: [ownerState.loadingPosition === "end" ? children : loadingButtonLoadingIndicator, ownerState.loadingPosition === "end" ? loadingButtonLoadingIndicator : children]
  }));
});
true ? LoadingButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * @ignore
   */
  id: import_prop_types.default.string,
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading: import_prop_types.default.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: import_prop_types.default.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(import_prop_types.default.oneOf(["start", "end", "center"]), (props) => {
    if (props.loadingPosition === "start" && !props.startIcon) {
      return new Error(`MUI: The loadingPosition="start" should be used in combination with startIcon.`);
    }
    if (props.loadingPosition === "end" && !props.endIcon) {
      return new Error(`MUI: The loadingPosition="end" should be used in combination with endIcon.`);
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["contained", "outlined", "text"]), import_prop_types.default.string])
} : void 0;
var LoadingButton_default = LoadingButton;
export {
  LoadingButton_default as default,
  getLoadingButtonUtilityClass,
  loadingButtonClasses_default as loadingButtonClasses
};
//# sourceMappingURL=@mui_lab_LoadingButton.js.map
