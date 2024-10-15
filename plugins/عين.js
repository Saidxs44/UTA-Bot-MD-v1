import fetch from 'node-fetch'
let timeout = 30000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
  conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
  let id = m.chat
  if (id in conn.tebakbendera) {
    conn.reply(
      m.chat,
      '╮───────────────────────╭ـ\n│ *في سؤال لسه مجاوبتش عليه يا فاشل* ┃❌ ❯\n╯───────────────────────╰ـ',
      conn.tebakbendera[id][0]
    )
    throw false
  }
  let src = await (
    await fetch(
      'https://raw.githubusercontent.com/Saidxs44/UTA-Bot-MD-v1/master/3.json'
    )
  ).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*〘 ${command.toUpperCase()} 〙*
*༺═━━═⊱⊰✺⊱⊰═━━═༻*

*⌊⏳╎الوقت ${(timeout / 1000).toFixed(2)} ثانيه*
*⌊💰╎الجائزة [ ${poin} ] إكس بي*
*⌊‼️╎اكتب "استسلم" للاِستسلام*
*⌊🍡╎اكتب ".تلميح" لمعرفة الجواب*
*⌊📌╎رد علي هاذه الرسالة بالجواب*

*『🎐┇ᴜᴛᴀ - ʙᴏᴛ』*

*༺═━━═⊱⊰✺⊱⊰═━━═༻*
> رد علي الرسالة بكلمه [ استسلم ] *بدون نقطه*
> إستخدم امر [ .لفل ] للإستطلاع علي مستواك الحالية او الجديدة!.`.trim()

  conn.tebakbendera[id] = [
    await conn.sendFile(m.chat, json.img, '', caption, m),
    json,
    poin,
    setTimeout(() => {
      if (conn.tebakbendera[id])
        conn.reply(m.chat, `
╮───────────────────────╭ـ
│ ❎ *خلص الوقت وانت زي منت فاشل مجوبتش*
│ ✅ *الاجابه هي : ${json.name}*
╯───────────────────────╰ـ`, conn.tebakbendera[id][0])
      delete conn.tebakbendera[id]
    }, timeout),
  ]
}
handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^عين|guessflag/i

export default handler
