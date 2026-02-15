import parse from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'

interface Props {
	html: string
}
export const HtmlParser = ({ html }: Props) => {
	return parse(sanitizeHtml(html))
}
