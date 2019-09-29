json.array! @messages do |message|
  json.content message.content
  json.id message.id
  json.user_name message.user.name
  json.date message.created_at.zone.strftime("%Y-%m-%d %H:%M")
  json.image message.image.url
end