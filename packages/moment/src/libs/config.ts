class Config {
    public get S3_ACCESS_KEY_ID () {return readEssentialValue('S3_ACCESS_KEY_ID')}
    public get S3_SECRET_ACCESS_KEY () {return readOptionalValue('S3_SECRET_ACCESS_KEY')}
    public get S3_REGION () {return readOptionalValue('S3_REGION')}
    public get S3_BUCKET () {return readEssentialValue('S3_BUCKET')}

    public get TINIFY_API_KEY () {return readEssentialValue('TINIFY_API_KEY')}

    public get MONGO_USERNAME () {return readEssentialValue('MONGO_USERNAME')}
    public get MONGO_PASSWORD () {return readEssentialValue('MONGO_PASSWORD')}
    public get MONGO_HOST () {return readEssentialValue('MONGO_HOST')}
}

function readOptionalValue (key: string): string | undefined
function readOptionalValue (key: string, fallback: string): string
function readOptionalValue (key: string, fallback?: string) {
    const value = process.env[key]
    if (value === undefined) return fallback

    return value
}

function readEssentialValue (key: string) {
    const value = process.env[key]
    if (value === undefined) throw new Error(`Essential config ${key} unavailable`)

    return value
}

export default new Config()
