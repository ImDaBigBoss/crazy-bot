/*

Code from: https://github.com/SudhanPlayz/discordjs-activity

Copyright (c) 2021 Sudhan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const { Structures, Invite } = require('discord.js');
const fetch = require("node-fetch")

Structures.extend('VoiceChannel', VoiceChannel => {
  return class EpicVoiceChannel extends VoiceChannel {
    constructor(client, data) {
      super(client, data);
      this.applications = {
        "youtube_together": "755600276941176913",
        "fishington": "814288819477020702",
        "chess_in_the_park": "832012774040141894",
        "chess_in_the_park_dev": "832012586023256104",
        "betrayal": "773336526917861400",
        "poker_night": "755827207812677713",
        "doodle_crew": "878067389634314250",
        "letter_tile": "879863686565621790",
        "word_snacks": "879863976006127627"
      }
    }

    /**
     * Creates Activity Invite in the voice channel
     * @param {string} Application - Application
     * @returns {Invite}
     */
    activityInvite(application) {
      return new Promise(res => {
        let fetched = fetch(`https://discord.com/api/v8/channels/${this.id}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 60,
            max_uses: 0,
            target_application_id: this.applications[application]?this.applications[application]:application,
            target_type: 2,
            temporary: false,
            validate: null
          }),
          headers: {
            "Authorization": `Bot ${this.client.token}`,
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
        res(fetched)
      })
    }
  }
});
