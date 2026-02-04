const MetaInfo = (props) => {
  const { title, description, keywords } = props

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
    </>
  )
}

export default MetaInfo