import { Bot, Embed } from './yapper.js';

const bot = new Bot(process.env.BOT_TOKEN);
const GUILD_ID = '1e8356db-1b9f-4083-a075-25363a8a8607';
const ROLES_CH = '22384b40-536e-489d-a1d2-60469eec420a';
const UPDATES_CH = 'd5e88c54-1d44-4e83-bfe8-47ee7f849df1';
const WELCOME_CH = 'b5e35ad5-6f23-4384-ad4e-6b09fd2199bc';
const UNVERIFIED = 'ba5998d8-d325-42a9-88c4-1c215ade1474';
const MEMBER = '314d903c-25ce-4d7a-9975-508a36adae88';

// --- gender //
const GENDER_ROLES = {
  '🤍': 'f16fc0a6-8645-4bdb-88ae-48594502568b',
  '🖤': '456aa22a-56dd-4a30-b932-5526e8eb6df3',
  '🩵': '5fa57823-4de2-4a7f-9813-b76d1ff841c0',
  '🪽': '469c2136-402f-46bd-96bb-61c43b738d31',
  '🎀': '782c1ebf-d759-4d2e-8403-e7efe6b810b1',
  '☁️': 'ab2f95e3-a247-403f-aeb7-69831086be96',
};

// --- sexuality //
const SEXUALITY_ROLES = {
  '🕊️': 'c613876c-42c1-4966-925b-767f5c6a2fdb',
  '🪡': 'f7ef576e-3443-422c-8ce6-d48fb19fb0a6',
  '🦢': '29f19a50-59c8-4cd7-b091-7c2117d67fbc',
  '🕯️': '0b1d76f2-f6b9-4e4f-8871-e20709c74dc1',
  '🖊️': 'be209300-01c7-4247-866c-e71165441bb8',
  '🧸': '11afff7d-9411-45da-bdea-52bd112f960b',
  '🌙': '0adc7c2f-21b9-4724-b930-8284f5c3b5c1',
};

// --- age //
const AGE_ROLES = {
  '🦴': 'ca17b549-0174-4995-8a28-49c977e3eb66',
  '⛓️': '290a44c2-d62e-4c05-8f3f-3bec0ab15c5f',
};

// --- pronouns //
const PRONOUN_ROLES = {
  '🩷': '1ed6f908-1034-484f-aabb-ef9cecbdf639',
  '💙': '41123654-ca9c-49d9-9ce5-d30b5422347f',
  '💛': 'e20aaf60-bee3-4f7a-8697-dc8707c2c632',
  '🫶': '76ca96b1-6b2e-4a87-ac88-2e004fb8843e',
  '❓': 'a2f16f42-07d9-4152-9c30-80e88bc373d9',
};

const userPicks = new Map();

// helper so welcome is the same everywhere
async function sendWelcome(userId) {
  const user = await bot.user(userId).catch(() => null);
  const avatar = user?.avatar_url || 'https://i.imgur.com/placeholder.png';
  const welcomeEmbed = new Embed()
    .title('₊˚⊹ ʚ♡ɞ welcome to angelcore ʚ♡ɞ ⊹˚₊')
    .description(
      `ʚ ̊ . **#rules** | read before you speak\n` +
      `ʚ ̊ . **#roles** | grab your yapper tags\n` +
      `ʚ ̊ . **#general** | drop your hot takes\n\n` +
      `♡ ₊˚ ﹒ hope you enjoy your stay ﹒ ˚₊ ♡`
    )
    .color('#FFB6C1')
    .thumbnail(avatar)
    .footer('angelcore • soft vibes only');

  await bot.send(WELCOME_CH, 
    `₊˚⊹ ୨୧ ♡ welc <@${userId}> to ⋆｡‧˚ʚ ᵃⁿᵍᵉˡᶜᵒʳᵉ ɞ˚‧｡⋆ @welcome ping !!\n` +
    `-₊˚⊹・𝓇𝓊𝓁ℯ𝓈 | read before you speak\n` +
    `-୨୧・𝓇ℴ𝓁ℯ𝓈 | grab your yapper tags\n` +
    `-₊˚⊹・ℊℯ𝓃ℯ𝓇𝒶𝓁 | drop your hot takes\n\n` +
    `♡ ₊˚ . hope you enjoy your stay . ˚₊ ♡`,
    { embeds: [welcomeEmbed] }
  );
}

bot.on('ready', (me) => console.log(`online as ${me.username}`));
bot.command('ping', 'test', (m) => m.reply('pong >.<'));

// TEST COMMAND — type /welcome to test #welcome without kicking anyone
bot.command('welcome', 'Test the welcome message', async (msg) => {
  await sendWelcome(msg.author_id);
  msg.reply('sent welcome to #welcome!');
});

// JOIN — welcome UNVERIFIED people
bot.on('member_join', async (ev) => {
  if (ev.server_id !== GUILD_ID) return;
  await bot.addRole(GUILD_ID, ev.user_id, UNVERIFIED);
  await bot.send(ROLES_CH, `hai <@${ev.user_id}> ! pick 1 gender + 1 sexuality + 1 age to unlock >.<`);
  await sendWelcome(ev.user_id);
});

// picking = verifying + announce in #updates ONLY
bot.on('reaction_add', async (r) => {
  if (r.channel_id !== ROLES_CH) return;

  let category = null;
  let roleId = null;

  if (GENDER_ROLES[r.emoji]) { category = 'gender'; roleId = GENDER_ROLES[r.emoji]; }
  else if (SEXUALITY_ROLES[r.emoji]) { category = 'sexuality'; roleId = SEXUALITY_ROLES[r.emoji]; }
  else if (AGE_ROLES[r.emoji]) { category = 'age'; roleId = AGE_ROLES[r.emoji]; }
  else if (PRONOUN_ROLES[r.emoji]) { category = 'pronouns'; roleId = PRONOUN_ROLES[r.emoji]; }
  else return;

  await bot.addRole(GUILD_ID, r.user_id, roleId);

  if (category !== 'pronouns') {
    if (!userPicks.has(r.user_id)) userPicks.set(r.user_id, {});
    userPicks.get(r.user_id)[category] = true;
    const picks = userPicks.get(r.user_id);

    if (picks.gender && picks.sexuality && picks.age) {
      await bot.removeRole(GUILD_ID, r.user_id, UNVERIFIED).catch(() => {});
      await bot.addRole(GUILD_ID, r.user_id, MEMBER);
      await bot.send(ROLES_CH, `verified! welcome <@${r.user_id}> ʚ♡ɞ`);

      const user = await bot.user(r.user_id).catch(() => null);
      const avatar = user?.avatar_url || 'https://i.imgur.com/placeholder.png';

      const updateEmbed = new Embed()
        .title('₊˚⊹ ʚ♡ɞ a new angel joined ʚ♡ɞ ⊹˚₊')
        .description(`<@${r.user_id}> just joined angelcore ♡`)
        .color('#FFB6C1')
        .thumbnail(avatar)
        .footer('angelcore');

      await bot.send(UPDATES_CH, `₊˚⊹ ʚ♡ɞ @everyone, a new angel has joined ʚ♡ɞ ⊹˚₊\n♡ ˚ . everyone welcome <@${r.user_id}> . ˚ ♡`, { embeds: [updateEmbed] });

      userPicks.delete(r.user_id);
    }
  }
});

bot.on('reaction_remove', async (r) => {
  if (r.channel_id !== ROLES_CH) return;
  const roleId = GENDER_ROLES[r.emoji] || SEXUALITY_ROLES[r.emoji] || AGE_ROLES[r.emoji] || PRONOUN_ROLES[r.emoji];
  if (roleId) await bot.removeRole(GUILD_ID, r.user_id, roleId);
});

bot.start();