json.array! @messages do |message|
  json.content message.content
  json.id message.id
  json.user_name message.user.name
  json.date message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
  json.image message.image.url
end