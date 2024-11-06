# Intro

This tool makes it possible to run through GuidedTrack programs automatically, which is useful for testing programs quickly without having to manually click / type through them yourself!

# Getting started

## 1. Add `*trigger` events to your GT program.

For all of the pages in your program that should be controlled automatically, you'll need to create a `*trigger` event and send data so that the `gt-tester` tool knows what to do on that page. Let's say, for example, that you have a question like this in your program:

```
*question: What's your name?
	*save: theirName
```

To get `gt-tester` to type in an answer automatically, you'd need to add a `*trigger` for a "gt-test" event and send along whatever you want to be typed (and a "submit-responses" event), like this:

```
>> dataToSend = { "events" -> [] }
>> dataToSend["events"].add({ "type" -> "enter-text", "value" -> "Alice" })
>> dataToSend["events"].add({ "type" -> "submit-responses" })

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

# Event types

Here's the complete list of possible `*trigger` types. More will be added over time, so check back occasionally!

- **alert** = shows an alert, pausing execution until the alert is dismissed; accepts a text value and (optionally) a "level" of importance (e.g., "info", "warning", "danger"; and the default is "info" if a value isn't provided)
- **click** = clicks on an element; accepts a text value that the clicked element should contain and/or a class name that the clicked element should have
- **enter-text** = enters text into the next available text field; accepts a text value
- **pause** = pauses the automation; accepts a number of milliseconds
- **select-slider-value** = selects a particular value along a slider input
- **submit-responses** = submits responses to the current question or page of questions

For example:

```
>> dataToSend = { "events" -> [] }
>> dataToSend["events"].add({ "type" -> "enter-text", "value" -> "Alice" })
>> dataToSend["events"].add({ "type" -> "click", "value" -> "chocolate", "class" -> "first-answer" })
>> dataToSend["events"].add({ "type" -> "pause", "value" -> 2000 })
>> dataToSend["events"].add({ "type" -> "alert", "value" -> "Oh, no!", "level" -> "danger" })
>> dataToSend["events"].add({ "type" -> "submit-responses" })

*trigger: gt-test
	*send: dataToSend
```

Note that "submit-responses" events aren't necessary on standalone multiple-choice question pages or any other pages that are submitted automatically when an answer is selected.

# Notes

The nice thing about this setup is that it doesn't require any changes in your GT program code between development and production! Unless you just happen to have separate events called "gt-test" (which is probably very unlikely), then these triggers will fire silently during production and nothing will happen. They only do something at all when the program runs at the special testing URL (https://gt-tester.vercel.app)!

# Demo

Here's a demo of `gt-tester` in action:

- **GT program code:** https://www.guidedtrack.com/programs/19505/edit
- **Public program (non-automated):** https://www.guidedtrack.com/programs/odwuk6y/run
- **Public program (automated):** https://gt-tester.vercel.app/test/?id=odwuk6y

(NOTE: If you run the non-automated program and the automated program in the same browser instance, you may have to use the "Reset everything" menu option to start one the test(s) over from the beginning. It's probably better, though, to test them in isolation by running each in an incognito / private browser instance.)

# To do

- Add support for all possible action types (e.g., playing an audio file, playing a video file, logging in, making a purchase, etc.). I'm not sure if this is feasible for all action types — for example, logging in probably temporarily navigates away from the program to perform an OAuth login, in which case there will be no way to control what'll happen there — but I'll give it a shot anyway!
  - keywords: `audio`, `button`, `chart`, `clear`, `component`, `database`, `email`, `events`, `experiment`, `for`, `goto`, `group`, `html`, `if`, `image`, `label`, `list`, `login`, `maintain`, `navigation`, `page`, `points`, `program`, `progress`, `purchase`, `question`, `quit`, `randomize`, `repeat`, `return`, `service`, `set`, `settings`, `share`, `summary`, `switch`, `trigger`, `video`, `wait`, `while`
    - `*question` types:
      - calendar
      - checkbox
      - choice
      - number
      - paragraph
      - ranking
      - slider
      - text
  - actions:
    - clicking on a particular element
    - typing in a particular element
    - pausing for a certain amount of time
    - show a dismissable alert
    - show a pop-up notification or toast
    - submitting responses
- Add a checkbox on the home page to reset a program's progress in case the previous run didn't finish. I originally thought that this should be the default, but upon reflection I realized that there are probably times where we'd want to test what happens if a user returns to the program in the middle of a run. I mean, the checkbox could still be checked by default, but I still want to provide a way to disable automatic resetting.
  - the reset URL is: `https://www.guidedtrack.com/programs/<id>/rerun?_redirect=<next_url>`
- Add the ability to provide actions _without_ modifying the program. It can be a pain to edit an entire program just to test it out. For example, the Clearer Thinking team probably wouldn't want to add testing comments to all of their programs; it'd be easier for them to leave the program alone and to specify the actions from the `gt-tester` home page.
