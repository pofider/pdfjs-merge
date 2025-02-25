const { Document, External } = require('@jsreport/pdfjs')
const fs = require('fs')
const path = require('path')

async function run() {
    const document = new Document()
    const external = new External(fs.readFileSync(path.join(__dirname, 'main.pdf')))
    document.append(external)
    const external2 = new External(fs.readFileSync(path.join(__dirname, 'background.pdf')))
    document.merge(external2)
    const pdfBuffer = await document.asBuffer()   
    fs.writeFileSync('out.pdf', pdfBuffer)
}

async function runForOneBackgroundPage() {
    const document = new Document()
    const external = new External(fs.readFileSync(path.join(__dirname, 'main.pdf')))
    document.append(external)
    const external2 = new External(fs.readFileSync(path.join(__dirname, 'background-one-page.pdf')))

    const numberOfPages = external.pages.length
    for (let i = 0; i < numberOfPages; i++) {
        document.merge(external2, { pageNum: i })
    }
   
    const pdfBuffer = await document.asBuffer()   
    fs.writeFileSync('out.pdf', pdfBuffer)
}


runForOneBackgroundPage().then(() => console.log('done')).catch(console.error);