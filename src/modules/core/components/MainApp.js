import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";

const styles = {};

const MainApp = ({ classes }) => {
  return (
    <div></div>
  );
};

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(injectSheet(styles)(MainApp));
