---
id: user-engagement-analytics
title: User Engagement Analytics
sidebar_label: User Engagement Analytics
slug: /pre-built-ui/user-engagement-analytics
 
---
 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
You can track your user’s interaction on the Summary UI and view analytics on what your users are clicking on the Summary UI and how they are engaging with the interface. 

After enabling the user-engagement analytics for Summary UI, you can log into your Segment- analytics platform account and view event logs fired from the Summary URLs.

To get the user engagement data, follow the steps given below: 

&nbsp;&nbsp;  [Step 1: Add a Source in the Segment app that references the Summary URL](#1-add-a-source-in-segment)<br/>

&nbsp;&nbsp;  [Step 2: Register your “Segment Key” in Symbl Platform](#2-register-your-segment-key-with-symbl)<br/>

&nbsp;&nbsp; [Step 3: View analytics on your Segment account](#3-view-analytics-on-segment)

:::info Note 
The Segment data will only be available for the summary URLs that have been generated after the “Segment Key” has been registered. There will not be any analytics data available for the previously generated links.
:::

### 1. Add a Source in Segment
---

The very first step is to add a Source for the Summary URL in the Segment application.  

**To add a source in Segment,**  
1. Log in to your **Segment** ((https://segment.com/) account. 
2. Go to **Sources** and click **Add Source**. 
3. Select **JavaScript website** from the source catalog page.  
4. Click **Add Source** once again 
5. Enter the **Name** and **Labels**, as required. 
5. In the **Website URL**, enter the URL of the Summary UI for which you’d like to get the user-engagement analytics. 

This adds the Summary UI URL as a source in Segment. 

![segment](/img/source-set-up.png)

:::info
When a new Source is created, Segment generates a unique key. This is a unique identifier that is used to track the analytics data for the Summary URL. We call this the Segment Key.
:::


6. Go to **Settings** tab > **API Keys**
7. Copy the **Write Key**. 

You must use the value of Write Key as the Segment Key in Symbl.

![segment-key](/img/segment-key.png)

### 2. Register your Segment Key with Symbl
---
**To register your Segment key,**
1. Log into Symbl Platform (https://platform.symbl.ai/), 
2. Go to **Pre-Built UI** > **Add Tracking Code**. 
3. Enter the **Segment Key** you got from the above-mentioned step. 
4. Click **Add Key**. 

![platform](/img/pre-built-ui-segment.png)

### 3. View Analytics on Segment
---
You can now log into your Segment app and view user activities in all of the Summary URLs that are tied to your Symbl account.

![analytics](/img/segment-analytics.png)

