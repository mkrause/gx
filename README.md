___
**Note:** Unfortunately, due to changes to the protocol (made by Google), this library no longer functions properly. Because we cannot keep up with the pace of protocol changes, this library is not updated anymore :(.
___

gx
==

A Java client for the [Google Drive Realtime API](https://developers.google.com/drive/realtime/), which allows easy multi-user collaboration on datastructures such as lists, maps and strings.

Official support for the Realtime API is only provided through a [Javascript client](https://developers.google.com/drive/realtime/realtime-quickstart). However, **gx** is a Java library that provides easy usage of most of the functionality provided by the API in environments that are not only limited to web applications. gx uses no parts of the official client but instead relies on reverse-engineering of the network protocols, it is not a wrapper around a Javascript library.


# Installation

Currently no automated installation options are available through Maven or Ivy, but [we're working on that](https://github.com/mkrause/gx/issues/43). For now you'll have to check out the code and compile your own .jar - sorry 'bout that!


# Usage

We have included several demo applications with the project that are well commented and show the proper usage of the application. These are available in the `src/main/demo/` folder of the repository. These applications showcase, either using a CLI or GUI, the functionality of the library.
