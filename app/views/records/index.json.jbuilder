json.records do
  json.array!(@records) do |record|
    json.extract! record, :id, :title, :milk_amount
    json.created_at record.created_at.strftime('%Y-%m-%d %H:%M')
    json.updated_at record.updated_at.strftime('%Y-%m-%d %H:%M')
    json.url record_url(record, format: :json)
  end
end