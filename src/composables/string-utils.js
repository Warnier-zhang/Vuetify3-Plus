export function useStringUtils() {
    function toHtml(string) {
        let html = string;

        if (html) {
            // 替换换行符
            html = html.replace(/\t/g, '');
            // html = html.replace(/\t\n/g, '<br/>');
            html = html.replace(/\n/g, '<br/>');
        }
        return html;
    }

    return {
        toHtml
    };
}
