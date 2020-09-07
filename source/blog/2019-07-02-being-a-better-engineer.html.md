---
title: Being a Better Engineer
date: 2019-07-02 16:07 UTC
author: Afam Agbodike
published: false
tags: engineering
---

## Communication
Over-communication is better than under-communication, but strive to find the
right level of communication.

Communication goes both ways, so remember to listen when others are
communicating to you. If you are assigned a story, read the whole story and any
comments / screenshots before starting. If you only read part you may miss a
critical component and wind up working on the wrong thing.

If you are working on something and have a committed due date, make sure you
provide an update on the due date at the latest, regardless of whether you hit
the target or not. Even better provide regular updates during the course of the
project, but an update when the deliverable is due as an absolute requirement.

### Ways to communicate:
1. In the story, this keeps the info in the relevant context (what if you have to
   stop working on the story? Knowing where you were, and what progress you've
made could be helpful for when the story is started up again. Especially if
another engineer winds up taking over the story at a later date.)

1. Send status updates in your communication tool (like slack). For example, if
   you are going to deep dive into coding for an expended period, send a message
to let people know, set your status to "Do not Disturb", and let them know who to
contact if they need to reach you urgently (most likely this should be your project
or product manager). This is especially important when you are working remotely,
if there is an urgent matter that needs your input, it is *very* important that
the stakeholders are able to reach you.

## Don't make excuses
Sometimes things come up, but most of the time excuses are BS. Explain why you
couldn't do something, what steps you've taken so far, and what you plan to do
to get the work done, or what help you need.

### Think of solutions

### Don't say "no" unless you are certain.

### Sometimes you shouldn't say "yes", even if you know you can easily do it.

On the other hand, you shouldn't get in the habit of automatically saying "yes".
You need to understand the problem being solved by the request. You will often
get requests to do a certain bit of work, but the requester will not tell you
why they want it done. Often engineers will immediately say "yes" as they know
they can do it, but if you don't know the why, then you don't know if you should
do it, or if there is a better way.

Don't be contentious, say yes, but ask why, maybe there is a more time efficient
way (this way the requester understands you are trying to provide an even better
solution, not just being obstructionist).

## Use existing libraries.

### Don't do it blindly

## Ownership

## Think of the customer or user
## Examples:

## Think of the sad path

### The site is down

You just released a change to production and the worst case just happened: The
site is down.

This is how to handle it:
First, let the stakeholders know. You should not be hiding the bad occurences,
even if you are certain you can resolve it quickly, people need to be made aware
of major issues.
1. Roll-back. again, do this before trying to solve the issue


2 situations:
1. you know the issue, and it's a quick fix
1. It is not an obviously quickly resolved problem (either you don't know what
   is wrong, or you know what's wrong and it's not easy to fix)

### Ask for help

Things often turn out to be tougher than we think they are. Engineering is a
series of making mistakes, but it's important to step back every so often and
evaluate the progress you are making. Sometimes we need help, and often times
people will have a different approach or experience that can help us through the
times when we are stuck.

### Use error reporting tools, and pay attention to errors

Some of this is about the organization you are a part of, but a well run
engineering team will treat error logs with a high degree of importance. You
should monitor the error reporting tools (logs, exceptions, etc.) and fix the
underlying issues. Even minor appearing errors can be an indication of an
important issue in the code that can sneak up on you unexpectedly.

At the very least, ignoring errors builds a habit, which can result in issues
being unresolved for a long time. This can result in minor issues piling up and
turning into a large issue, which can then be quite difficult to correct.

## Miscellaneous

When you do something interesting, write a blog article about it.

### Estimating

Work on improving your estimates for the work you will do. It is an eternal
struggle between engineering and other business units, but improving your
estimating skills will reduce the friction, make your work experience more
pleasant, and your colleagues will have more faith in your abilities.

As engineers we are asked to do an impossible task: predict the future.

Whenever your estimates are significantly wrong, do an internal post-mortem. What went wrong
that caused your estimate to be off. Even when you finished it in much less time
than you estimated, you still were off on your estimate, and it's worth
identifying what caused to to be off.

Did you factor in testing?
Did you factor writing tests? (sometimes more time consuming than the actual
functional work)
Did you think of the edge cases?
Is it going to be in an area of code that you are currently familiar with? Even
if you wrote the code, if you haven't looked at it in months you are no longer
familiar with it, so you'll need to re-familiarize yourself, and there's higher
chance of introducing regressions.
Did you consider how many other components it interacts with? A central portion
of the code could be relied on by many other sections of the app, and require
refactoring those other sections for the changes.

### Be Concise
- branch names
- commit messages

### Think test first
