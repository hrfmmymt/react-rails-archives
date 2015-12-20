class AddMilkToRecord < ActiveRecord::Migration
  def change
    add_column :records, :milk_amount, :integer
  end
end
