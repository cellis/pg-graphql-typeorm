export = DbEnvironment;
/**
 * Each test suite ( file ) will run this code
 * before running
 */
declare class DbEnvironment extends NodeEnvironment {
}
import NodeEnvironment = require("jest-environment-node");
