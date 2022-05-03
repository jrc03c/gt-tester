# Intro

This tool makes it possible to run through GuidedTrack programs automatically, which is useful for testing programs quickly without having to manually click / type through them yourself!

# Getting started

## 1. Add `*trigger` events to your GT program.

For all of the pages in your program that should be controlled automatically, you'll need to create a `*trigger` event and send data so that the `gt-tester` tool knows what to do on that page. Let's say, for example, that you have a question like this in your program:

```
*question: What's your name?
	*save: theirName
```

To get `gt-tester` to type in an answer automatically, you'd need to add a `*trigger` for a "gt-test" event and send along whatever you want to be typed (and a "submit" event), like this:

```
>> dataToSend = { "events" -> [] }
>> dataToSend["events"].add({ "type" -> "enter-text", "value" -> "Alice" })
>> dataToSend["events"].add({ "type" -> "submit" })

*trigger: gt-test
	*send: dataToSend

*question: What's your name?
	*save: theirName
```

Importantly, this trigger must come right _before_ the relevant page! Also, check out the list at the bottom of this page for all possible `*trigger` event types.

## 2. Make your program publicly available at the testing URL.

Navigate to the "Publish" tab of your program and add this URL to the list of valid URLs at the bottom of the page:

https://gt-tester.vercel.app/test

## 3. Get your program's ID.

In the "Publish" tab of your program, get the ID of your program. This can be found in two places: in the public URL of the program (e.g., https://www.guidedtrack.com/programs/YOUR_PROGRAM_ID/run) or in the opening tag of the HTML `<body>` code (e.g., `<div ... id="YOUR_PROGRAM_ID" ... >`).

## 4. Go to the `gt-tester` home page.

Navigate to https://gt-tester.vercel.app in your browser.

## 5. Enter the ID in the text field.

In the text field on the `gt-tester` home page, enter your program's ID. Then click the "Test" button. The program should begin to run automatically!

# Triggers

Here's the complete list of possible `*trigger` types. More will be added over time, so check back occasionally!

```
>> dataToSend = { "events" -> [] }
>> dataToSend["events"].add({ "type" -> "enter-text", "value" -> "Alice" })
>> dataToSend["events"].add({ "type" -> "enter-text", "value" -> 25 })
>> dataToSend["events"].add({ "type" -> "click", "value" -> "chocolate" })
>> dataToSend["events"].add({ "type" -> "pause", "value" -> 2000 })
>> dataToSend["events"].add({ "type" -> "submit" })

*trigger: gt-test
	*send: dataToSend

*page
	*question: What is your name?
		*save: theirName

	*question: How old are you?
		*type: number
		*save: theirAge

	*question: What's your favorite flavor of ice cream?
		*save: theirFavoriteIceCreamFlavor
		chocolate
		vanilla
		strawberry
```

Note that "submit" events aren't necessary on standalone multiple-choice question pages or any other pages that are submitted automatically when an answer is selected.

# Notes

The nice thing about this setup is that it doesn't require any changes in your GT program code between development and production! Unless you just happen to have separate events called "gt-test" (which is probably very unlikely), then these triggers will fire silently during production and nothing will happen. They only do something at all when the program runs at the special testing URL (https://gt-tester.vercel.app)!
