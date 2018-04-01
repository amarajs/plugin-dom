import buble from 'rollup-plugin-buble';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
    useStrict: false,
	plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        flow(),
        commonjs({
            include: ['node_modules/vdom-parser/**', 'node_modules/virtual-dom/**']
        }),
        buble(),
        globals(),
        builtins()
	]
};
