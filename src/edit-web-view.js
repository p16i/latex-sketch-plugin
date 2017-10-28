import webui from './webui';

export default function (context) {
    if(context.selection.length === 0 ){
        context.document.showMessage('Please select an latex layer');
        return;
    }

    context._latexSelected = context.selection[0];
    const command = context.command;
    let userInfo = command.valueForKey_onLayer_forPluginIdentifier('latexStr', context._latexSelected , 'latex-plugin');
    if(!userInfo){
        context.document.showMessage('Please select an latex layer');
        return;
    }

    webui(context, true);

    log('End Edit.js');

}
