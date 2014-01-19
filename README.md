loadScript
==========

Loads javascript asynchronously into the current page


Loads one or more script modules asynchronously, and executes the callback function once all scripts are successfully loaded. A callback function should always be passed as the last argument. Any arguments after the first callback are ignored.

The location of the script should be relative to the page containing the script. 

Use the callback function to nest more _load_ statements should scripts have dependancies on each other. The order of the arguments per _load_ statement does not guarantee the order in which the scripts are processed.

All cache headers are respected and each file is only downloaded once. Debugging tools should work as normal with scripts loaded using this method.

**Example 1**


```javascript
loadScript('cookie.js', function() {
  setCookie('login', new Date(), {expires: 90});
});
```

The example above loads the _cookie.js_ file. Note that any code after the _load_ function will continue to run whilst the script is loaded asynchronously.


**Example 2**

```javascript
loadScript('employee.js', '/scripts/customer.min.js', function() {
 
  //Code to execute once the files are loaded
}
```

In the example above, the _employee.js_ and the _customer.min.js_ files are added and the callback function is then executed once both scripts have been successfully loaded.


**Example 3**

```javascript
loadScript('parent.js', function() {
 
  loadScript('dependant.js', function() {

    //Code to execute goes here
  });
}
```

The example above shows how to load the _dependant.js_ file only once the _parent.js_ is loaded.
