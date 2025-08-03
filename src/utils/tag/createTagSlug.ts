const createTagSlug = (name: string): string => {
   return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
}

export default createTagSlug;