Angular 1 Pin Code Directive
==============

A simple Angular 1 directive to draw a n digit pin input.

![alt tag](https://github.com/VitorMFMarques/angularpincode/blob/master/image.png)

How to use?
==============

Just add an element of type pin 
```html
<pin digits="4" pin="pin"></pin>
```

Options
==============
Name    | Description | Mandatory | Default Value
 -------| ----------- | --------- | --------
pin | scope varible where the pin will be binded | Yes | NA
digits | number of digits | No | 4
hide-input | hide input value after inserted | No | true
hide-timeout | time after which the input value will be hidden | No | 200 (ms)
hide-symbol | the symbol used to show when input is hidden (HTML Symbol Entities) | No | &#9899; (&#9899)
on-enter | function to be called when user presse enter in last digit insertion | No | NA

Events
==============

To focus in the first input, broadcast the event 'focusPin'
```html
$scope.$broadcast('focusPin');
```
