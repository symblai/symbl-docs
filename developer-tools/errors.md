---
id: errors
title: Errors
sidebar_label: Errors
---

```bash
// example auth token is incorrect
{
    "message": "Token validation failed for provided token."
}
```

Symbl uses the following HTTP codes:

Error Code | Meaning
---------- | -------
200 | OK -- Success.
201 | Accepted -- Your request is successfully accepted.
400 | Bad Request -- Your request is invalid.
401 | Unauthorized -- Your API key is invalid.
403 | Forbidden
404 | Not Found -- The specified resource does not exist.
405 | Method Not Allowed -- You tried to access an api with an invalid method.
429 | Too Many Requests -- Too many requests hit the API too quickly.
500 | Internal Server Error -- We had a problem with our server. Try again later.


<aside class="notice">
If you face any issues or find bugs, please report them immediately to <a href="mailto:support@symbl.ai?subject=Support%20Ticket">support@symbl.ai</a> and we'll get back to you as soon as possible.
</aside>
