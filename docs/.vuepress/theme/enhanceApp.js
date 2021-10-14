// register Terra components
import Reference from "./terra-components/Reference";
import CodeSignature from "./terra-components/CodeSignature";
import JsonTreeView from "./terra-components/JsonTreeView";
import Param from "./terra-components/Param";
import TypeDesc from "./terra-components/TypeDesc";
import BoxField from "./terra-components/BoxField";
import ParamsList from "./terra-components/ParamsList";
import DarkModeSwitch from "./terra-components/DarkModeSwitch";

export default ({ Vue }) => {
  Vue.component("Reference", Reference);
  Vue.component("CodeSignature", CodeSignature);
  Vue.component("JsonTreeView", JsonTreeView);
  Vue.component("Parameter", Param);
  Vue.component("ParamsList", ParamsList);
  Vue.component("TypeDesc", TypeDesc);
  Vue.component("BoxField", BoxField);
  Vue.component("DarkModeSwitch", DarkModeSwitch);
  
};
