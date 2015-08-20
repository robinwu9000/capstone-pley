class Photo < ActiveRecord::Base
  validates :user_id, :business_id, :path, presence: true

  belongs_to :user
  belongs_to :business

  before_save :add_compressed

  def add_compressed
    self.compressed = self.path.gsub("/upload/", "/upload/q_jpegmini/")
  end
end
