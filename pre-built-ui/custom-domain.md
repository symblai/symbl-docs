---
id: custom-domain
title: Adding a Custom Domain
sidebar_label: Adding a Custom Domain

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can add a custom domain to personalize the URL for the Summary UI by injecting your company or brand name into the URL.

For example, your Summary UI will have the following URL definition: 

`https://{customSubdomain}.Symbl.us`

You can utilize Symbl's vanity domain of `Symbl.us` by registering your custom subdomains. By default, you can register 1 subdomain per account.

:::note
Currently, custom domain feature is supported for the Text Summary and Video Summary UI. We currently don’t support Tracker Analytics UI/ Audio-Summary UI. 
:::

### Step 1: Register your Subdomain

---

To register your custom domain,  

1. Log in to the [Platform](https://platform.symbl.ai).
2. Go to **Pre-Built UI** > **Custom Domain**.<br/>

![custom-domain](/img/custom-domain.png)

3. Click **Setup with Exp.stream**. The **Register Custom Domain** screen appears. 
4. Enter your domain name as shown below:

![add-custom-domain](/img/register-custom-domain.png)

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

### Response 

Notice the URL that gets generated which contains the custom domain `acme` registered in Step 1. 

```json
{
    "name": "verbose-text-summary",
    "url": "https://acme.exp.stream/meeting/#/eyJzZXNzaW9uSWQiOiI1ODU5NjczMDg1MzEzMDI0IiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0L3NtYWxsLm1wNCJ9?showVideoSummary=true"
}
```
