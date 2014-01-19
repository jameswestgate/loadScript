/*
* Loads one or more script files and executes an optional function when loaded
* https://github.com/jameswestgate/loadScript
* 
* Copyright (c) James Westgate 2014
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

//Steve Souders - http://www.stevesouders.com/blog/2010/12/06/evolution-of-script-loading/
//Dustin Diaz - http://www.dustindiaz.com/scriptjs/
(function(context) {

	var loaded = []; //previously loaded scripts

	context.loadScript = function() {

		if (!arguments.length) return;

		var callback;                        
		var scripts = 0;
		var count = 0;
		
		//Loop through arguments
		for (var i=0, len=arguments.length; i<len; i++) {

			var arg = arguments[i];

			//Load args up to the callback, rest ignored
			if (typeof arg === 'function') {
				callback = arg;
				scripts = i;

				//Check callback ie if using loaded mods
				if (count === scripts) callback();
				break;
			}

			arg = arg.toString();

			//If loaded increment counter, else load with callback
			if (loaded[arg]) {
				count++;
				if (callback && count === scripts) callback();
			}
			else {

				var script = document.createElement('script');
				script.type = 'text/javascript';

				script.onload = script.onreadystatechange = function () {
					if (script.readyState && script.readyState !== 'complete' && script.readyState !== 'loaded') return false;

					script.onload = script.onreadystatechange = null;
					count++;
					loaded[arg] = true;

					if (callback && count === scripts) callback();

				};
				script.async = true;

				//Set source. Add preconfigured extension if required
				script.src = arg;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
	};

})(this);