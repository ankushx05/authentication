package domain

type MailSettings struct {
	Host       string `json:"host"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	Encryption string `json:"encryption"`
}

type Setting struct {
	UniqueID string
	Mail     *MailSettings
}
