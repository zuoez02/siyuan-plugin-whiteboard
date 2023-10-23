import PropTypes from "prop-types";
import { Whiteboard } from "@/whiteboard";

export const Tab = (props) => {
  return <Whiteboard initData={props.initData} name={props.name} el={props.el}></Whiteboard>
};

Tab.propTypes = {
  el: PropTypes.object.isRequired,
};
