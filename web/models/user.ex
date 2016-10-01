defmodule PhoenixTrello.User do
  use PhoenixTrello.Web, :model

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @required_fields ~w(first_name last_name email)a
  @optional_fields ~w(encrypted_password)a

  @derive { Poison.Encoder, only: [:id, :first_name, :last_name, :email] }

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields, @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password(params)
  end

  defp generate_encrypted_password(changeset, params) do
    case Dict.fetch(params, "password") do
      {:ok, password} ->
        case changeset do
          %Ecto.Changeset{valid?: true} ->
            put_change(changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
          _ ->
            changeset
        end
      _ ->
        changeset
    end
  end
end
