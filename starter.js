import { Bot, Embed } from './yapper.js';

const WELCOME_IMG = 'https://files.yapper.website/attachments/ecdfb5fc-8862-4173-9121-acfd26b9d5a3/r2-1795311219548-46ldo3sx4s7zwh6njmox.webp';
const UPDATES_IMG = 'https://files.yapper.website/attachments/ecdfb5fc-8862-4173-9121-acfd26b9d5a3/r2-1795311567047-wugp5ptxcrwxw5zabs8r.webp';

const GUILD_ID = '1e8356db-1b9f-4083-a075-25363a8a8607';
const WELCOME_CHANNEL = 'b5e35ad5-6f23-4384-ad4e-6b09fd2199bc';
const UPDATES_CHANNEL = 'd5e88c54-1d44-4e83-bfe8-47ee7f849df1';
const ROLES_CHANNEL = '22384b40-536e-489d-a1d2-60469eec420a';

const UNVERIFIED_ROLE = 'ba5998d8-d325-42a9-88c4-1c215ade1474';
const MEMBER_ROLE = '314d903c-25ce-4d7a-9975-508a36adae88';

const GENDER_IDS = [
  'f16fc0a6-8645-4bdb-88ae-48594502568b',
  '456aa22a-56dd-4a30-b932-5526e8eb6df3',
  '5fa57823-4de2-4a7f-9813-b76d1ff841c0',
  '782c1ebf-d759-4d2e-8403-e7efe6b810b1',
  'ab2f95e3-a247-403f-aeb7-69831086be96',
];

const SEXUALITY_IDS = [
  'c613876c-42c1-4966-925b-767f5c6a2fdb',
  'f7ef576e-3443-422c-8ce6-d48fb19fb0a6',
  '29f19a50-59c8-4cd7-b091-7c2117d67fbc',
  '0b1d76f2-f6b9-4e4f-8871-e20709c74dc1',
  '469c2136-402f-46bd-96bb-61c43b738d31',
  'be209300-01c7-4247-866c-e71165441bb8',
  '11afff7d-9411-45da-bdea-52bd112f960b',
  '0adc7c2f-21b9-4724-b930-8284f5c3b5c1',
];

const AGE_IDS = [
  'ca17b549-0174-4995-8a28-49c977e3eb66',
  '290a44c2-d62e-4c05-8f3f-3bec0ab15c5f',
];

const EMOJI_TO_ROLE = {
  '🌸': 'f16fc0a6-8645-4bdb-88ae-48594502568b',
  '💙': '456aa22a-56dd-4a30-b932-5526e8eb6df3',
  '💛': '5fa57823-4de2-4a7f-9813-b76d1ff841c0',
  '💜': '782c1ebf-d759-4d2e-8403-e7efe6b810b1',
  '❔': 'ab2f95e3-a247-403f-aeb7-69831086be96',
  '💗': 'c613876c-42c1-4966-925b-767f5c6a2fdb',
  '🌈': 'f7ef576e-3443-422c-8ce6-d48fb19fb0a6',
  '🧡': '29f19a50-59c8-4cd7-b091-7c2117d67fbc',
  '💖': '0b1d76f2-f6b9-4e4f-8871-e20709c74dc1',
  '🩵': '469c2136-402f-46bd-96bb-61c43b738d31',
  '🩷': 'be209300-01c7-4247-866c-e71165441bb8',
  '🖤': '11afff7d-9411-45da-bdea-52bd112f960b',
  '🤍': '0adc7c2f-21b9-4724-b930-8284f5c3b5c1',
  '✨': 'ca17b549-0174-4995-8a28-49c977e3eb66',
  '🌙': '290a44c2-d62e-4c05-8f3f-3bec0ab15c5f',
  '🎀': '1ed6f908-1034-484f-aabb-ef9cecbdf639',
  '🎧': '41123654-ca9c-49d9-9ce5-d30b5422347f',
  '🍓': 'e20aaf60-bee3-4f7a-8697-dc8707c2c632',
  '🍬': '76ca96b1-6b2e-4a87-ac88-2e004fb8843e',
  '💭': 'a2f16f42-07d9-4152-9c30-80e88bc373d9',
};

// ---- ONE pink card, text ONLY inside it ----
function welcomeEmbed(userId) {
  return new Embed()
    .title('₊˚⊹ welcome to angelcore ♡')
    .description(`₊˚⊹ ୨୧ ♡ welc <@${userId}> to ⋆｡‧˚ʚ ᵃⁿᵍᵉˡᶜᵒʳᵉ ɞ˚‧｡⋆ @welcome ping !!\n\n-˚₊‧ rules | read before you speak\n-˚₊‧ roles | grab your yapper tags\n-˚₊‧ general | drop your hot takes\n\n♡₊ . hope you enjoy your stay . ₊♡\n\nangelcore • soft vibes only`)
    .color('#ffb6d9')
    .image(WELCOME_IMG);
}

function updatesEmbed(userId) {
  return new Embed()
    .title('₊˚⊹ ʚ♡ɞ a new angel has joined ʚ♡ɞ ⊹˚₊')
    .description(`♡ ˚ . everyone welcome <@${userId}> . ˚ ♡\n\nsay hi to our newest angel !!`)
    .color('#ffb6d9')
    .image(UPDATES_IMG);
}

function getRoleIds(member) {
  if (!member) return [];
  const raw = member.role_ids || member.roles || member.roleIds || [];
  if (!Array.isArray(raw)) return [];
  return raw.map((r) => (typeof r === 'string' ? r : r.id)).filter(Boolean);
}

// download the pic and send it as a file IN THE SAME message as the pink card
async function getImageFile(url, name) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    return { name, data: bytes };
  } catch { return null; }
}

// ONE message, NO content text above the card, so no duplicate
async function sendWelcome(userId) {
  const file = await getImageFile(WELCOME_IMG, 'welcome.webp');
  await bot.send(WELCOME_CHANNEL, '', { embeds: [welcomeEmbed(userId)], files: file ? [file] : undefined });
}

async function sendUpdates(userId) {
  const file = await getImageFile(UPDATES_IMG, 'updates.webp');
  await bot.send(UPDATES_CHANNEL, '@everyone', { embeds: [updatesEmbed(userId)], files: file ? [file] : undefined });
}

const token = process.env.BOT_TOKEN || process.env.YAPPER_BOT_TOKEN;
const bot = new Bot(token);

bot.command('ping', 'Check the bot is alive', (msg) => msg.reply('pong ♡'));

bot.command('welcome', 'Test the welcome card', async (msg) => {
  await sendWelcome(msg.author_id);
  await msg.ephemeral('welcome test sent !! only you can see this');
});

bot.command('updates', 'Test the updates card', async (msg) => {
  await sendUpdates(msg.author_id);
  await msg.ephemeral('updates test sent !! only you can see this');
});

bot.command('roles', 'Post the roles message', async (msg) => {
  const embed = new Embed()
    .title('₊˚⊹ ୨୧ ♡ pick ur roles to verify ♡ ୨୧ ⊹˚₊')
    .description(`react to get ur roles !!\n\nu need **1 gender + 1 sexuality + 1 age** to unlock the server\npronouns are bonus, they don't count for verify\n\n**— gender —**\n🌸 female\n💙 male\n💛 non-binary\n💜 genderfluid\n❔ ask / other\n\n**— sexuality —**\n💗 straight\n🌈 gay\n🧡 lesbian\n💖 bi\n🩵 trans\n🩷 pan\n🖤 ace / aro\n🤍 queer / questioning\n\n**— age (18+ only) —**\n✨ 18\n🌙 18-24\n\n**— pronouns (bonus) —**\n🎀 she/her\n🎧 he/him\n🍓 they/them\n🍬 any pronouns\n💭 ask for pronouns`)
    .color('#ffb6d9')
    .image(WELCOME_IMG);

  const sent = await bot.send(ROLES_CHANNEL, '₊˚⊹ pick ur roles below to verify !! ⊹˚₊', { embeds: [embed] });
  const messageId = sent?.id || sent?.message?.id;
  if (messageId) {
    for (const emoji of Object.keys(EMOJI_TO_ROLE)) {
      try {
        await bot.react(ROLES_CHANNEL, messageId, emoji);
        await new Promise((r) => setTimeout(r, 300));
      } catch {}
    }
  }
  await msg.ephemeral('roles message posted in #roles !!');
});

async function checkVerify(serverId, userId) {
  try {
    const member = await bot.member(serverId, userId);
    const roleIds = getRoleIds(member);
    if (roleIds.includes(MEMBER_ROLE)) return;
    const hasGender = GENDER_IDS.some((id) => roleIds.includes(id));
    const hasSexuality = SEXUALITY_IDS.some((id) => roleIds.includes(id));
    const hasAge = AGE_IDS.some((id) => roleIds.includes(id));
    if (hasGender && hasSexuality && hasAge) {
      await bot.addRole(serverId, userId, MEMBER_ROLE);
      await bot.removeRole(serverId, userId, UNVERIFIED_ROLE);
      await sendUpdates(userId);
    }
  } catch (e) {
    console.error('[verify]', e?.message || e);
  }
}

bot.on('member_join', async (ev) => {
  try {
    const serverId = ev.server_id || GUILD_ID;
    const userId = ev.user_id;
    if (!userId) return;
    await bot.addRole(serverId, userId, UNVERIFIED_ROLE);
    await sendWelcome(userId);
  } catch (e) {
    console.error('[welcome]', e?.message || e);
  }
});

bot.on('reaction_add', async (ev) => {
  try {
    if (ev.channel_id !== ROLES_CHANNEL) return;
    if (ev.user_id === bot.me?.id) return;
    const roleId = EMOJI_TO_ROLE[ev.emoji];
    if (!roleId) return;
    const serverId = ev.server_id || GUILD_ID;
    await bot.addRole(serverId, ev.user_id, roleId);
    await checkVerify(serverId, ev.user_id);
  } catch (e) {
    console.error('[reaction_add]', e?.message || e);
  }
});

bot.on('reaction_remove', async (ev) => {
  try {
    if (ev.channel_id !== ROLES_CHANNEL) return;
    const roleId = EMOJI_TO_ROLE[ev.emoji];
    if (!roleId) return;
    const serverId = ev.server_id || GUILD_ID;
    await bot.removeRole(serverId, ev.user_id, roleId);
  } catch (e) {
    console.error('[reaction_remove]', e?.message || e);
  }
});

bot.on('error', (e) => console.error('[yapper]', e?.message || e));

bot.start();

