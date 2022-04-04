---
id: concepts
title: SIP & PSTN
slug: /concepts/pstn-and-sip/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API supports dialing through a simple phone number - `PSTN` or a Voice Over IP system - `SIP` endpoint. If you don't have your own Voice over IP (VoIP) system, use a phone number to make the connection.

### <a name="sip"></a>Session Initiation Protocol (SIP)

The SIP is a standardized communications protocol that has been widely adopted for managing multimedia communication sessions for voice and video calls. SIP may be used to establish connectivity between your communications infrastructures and Symbl's communications platform.

:::info
**SIP captures audio quality at 16KHz and above**.
:::


```json
{
  "endpoint": {
    "type": "sip",
    "uri": "sip:555@your_sip_domain", // SIP URI to dial in
    "audioConfig": { // Optionally any audio configuration
      "sampleRate": 16000,
      "encoding": "PCMU",
      "sampleSize": "16"
    }
  }
}
```

### <a name="pstn"></a>Public Switched Telephone Networks (PSTN)

The PSTN is a network that carries your calls when you dial in from a landline or cell phone. It refers to the worldwide network of voice-carrying telephone infrastructure, including privately-owned and government-owned infrastructure.

:::info
**PSTN captures audio quality at 8KHz max**.
:::

```json
{
  "endpoint": {
    "type": "pstn",
    "phoneNumber": "PHONE_NUMBER", // Use international code.
    "dtmf": "DTMF_MEETING_ID"  // if password protected, use "dtmf": "<meeting_id>#,#<password>#"
  }
}
```


