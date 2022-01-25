---
id: custom-domain
title: Adding a Custom Domain (Beta)
sidebar_label: Adding a Custom Domain (Beta)

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can add a custom domain to personalize the URL of your Summary UI by injecting your company or brand name into the URL. You can utilize Symbl's vanity domain of `symbl.us` for your custom subdomains. 

:::info
Currently, custom domain is supported for [Text](/docs/pre-built-ui/text-summary-ui) and [Video Summary UI](/docs/pre-built-ui/video-summary-ui). 
:::

**Example** <br/>

Your Summary UI will have the following URL definition: 

`https://{customSubdomain}.symbl.us`

Given below is a sample of a Summary UI with custom domain URL:

![custom-domain-URL](/img/custom-domain-screenshot.png)


:::important
By default, you can register 1 subdomain per account.
:::

### Step 1: Register your Subdomain

---

To register your custom domain,  

1. Log in to the [Platform](https://platform.symbl.ai).
2. Go to **Pre-Built UI** > **Custom Domain**.<br/>
3. Click the button **Setup with symbl.us**. 

![custom-domain](/img/custom-domain-1.png)

4. In **Register Custom Domain** screen, enter your domain name in the field **yourbrand**:

![add-custom-domain](/img/register-custom-domain-1.png)

4. Click **Create Custom Domain**.

This registers your custom domain with Symbl. 

### Step 2: Generate Summary UI 

---

After registering your domain, you can generate the Summary UI, by passing `"enableCustomDomain": true”` in the response body of Experience API as shown below:

#### Sample Request

```shell
curl --location --request POST 'https://api.symbl.ai/v1/conversations/5293433549750272/experiences' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
      "name": "verbose-text-summary",
      "enableCustomDomain": true
}'
```
#### Request Parameter

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
```enableCustomDomain``` | Optional | Boolen |  Enable generation of personalized URLs for Summary UI. 

### Response 

Notice the URL that gets generated which contains the custom domain registered in Step 1. 

```json
{
    "name": "verbose-text-summary",
    "url": "https://customSubdomain.symbl.us/meeting/#/eyJzZXNzaW9uSWQiOiI1ODU5NjczMDg1MzEzMDI0IiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0L3NtYWxsLm1wNCJ9?showVideoSummary=true"
}
```
