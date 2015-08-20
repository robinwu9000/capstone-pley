class User < ActiveRecord::Base
  validates :email, :session_token, :first_name, :last_name, presence: true
  validates :password, length: { minimum: 4, allow_nil: true }
  validates :email, uniqueness: {case_sensitive: false }

  attr_reader :password
  after_initialize :ensure_session_token
  before_save :get_profile_pic_path

  has_many :reviews
  has_many :photos

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def get_profile_pic_path
    self.profile_pic ||= "https://robohash.org/" + self.first_name.gsub(/\s+/,'') + self.last_name.gsub(/\s+/,'') + self.email.strip
  end
end
